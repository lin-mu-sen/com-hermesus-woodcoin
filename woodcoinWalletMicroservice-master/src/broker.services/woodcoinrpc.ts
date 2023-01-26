import { BrokerNode, BrokerOptions, ServiceBroker } from "moleculer";
import * as Moleculer from "moleculer";
import { TransactionService } from "../services/Transaction.service";
import { Connection } from "typeorm";
import { Device } from "../entity/Device";
import { Transaction } from '../entity/Transactions'
import { WoodcoinClient } from "../tools/rpcclient";
import { Address } from "../entity/Address";
let rpcClient = new WoodcoinClient();
export const WoodcoinRpcBrokerServices = (broker: ServiceBroker, conn: Connection) => broker.createService({
  name: "woodcoinrpc",
  actions: {
    async getbalance(ctx) {
      try {
        const { account, address } = ctx.params as any;
        if (!account || !address) return { status: false, reason: "request error params!", code: 1011 };
        let responce = await rpcClient.getbalance(account) as any;
        let AddressRepo  =  conn.getRepository(Address);
        if (!responce) return { status: false, reason: "get balance faild!", code: 1012 };
        try {
          let updated = await AddressRepo.update({
            balance: responce.result[0] || 0
          }, {
            address: address
          })
          return { status: true, result: responce.result[0], address: updated.raw };
        } catch (error) {
          return { status: true, result: responce.result[0] };
        }
      } catch (error) {
        return { status: false, reason: "error server!", code: 1013 };
      }
    },
    async getAlltransactions(ctx){
      try {
        const { account } = ctx.params as any;
        if (!account) return { status: false, reason: "request error params!", code: 1034 };
        let responce = await rpcClient.getAlltransactions(account) as any;
        if (!responce) return { status: false, reason: "getaccountaddress faild!", code: 1035 };
        return { status: true, result: responce.result[0] };
      } catch (error) {
        return { status: false, reason: "error server!", code: 1036 };
      }
    },
    async getaccountaddress(ctx) {
      try {
        const { account } = ctx.params as any;
        if (!account) return { status: false, reason: "request error params!", code: 1014 };
        let responce = await rpcClient.getaccountaddress(account);
        if (!responce) return { status: false, reason: "getaccountaddress faild!", code: 1015 };
        return { status: true, result: responce };
      } catch (error) {
        return { status: false, reason: "error server!", code: 1016 };
      }
    },
    async getaccount(ctx) {
      try {
        const { address } = ctx.params as any;
        if (!address) return { status: false, reason: "request error params!", code: 1017 };
        let responce = await rpcClient.getaccount(address);
        if (!responce) return { status: false, reason: "getaccount faild!", code: 1018 };
        return { status: true, result: responce };
      } catch (error) {
        return { status: false, reason: "error server!", code: 1019 };
      }
    },
    async setaccount(ctx) {
      try {
        const { account, fingerprint, chainid, address } = ctx.params as any;
        if (!account || !fingerprint || !chainid ) return { status: false, reason: "request error params!", code: 1020 };
        var __address:any;
        var _address:any={result:[]};
        if(chainid == "LOG") {
            _address = await rpcClient.newAccount(account) as any;
        }
        __address = _address.result[0] ? _address.result[0] : address
        if (!__address) return { status: false, reason: "setaccount faild!", code: 1021 };
        let AddressRepo  =  conn.getRepository(Address);
        let DeviceRepo  =  conn.getRepository(Device);
        let founddevice = await DeviceRepo.findOne({
          where:{
            fingerprint: fingerprint
          }
        });
        if(!founddevice) return { status: false, reason: "device not found err!", code: 1029 }
        let newAddress =  new Address();
        console.log({
          address: __address,
          chainid,
          device:founddevice,
        });
        
        newAddress.address = __address;
        newAddress.chainid = chainid;
        newAddress.device = founddevice;
        newAddress.status = true;
        newAddress.from_address = [];
        newAddress.to_address = [];
        newAddress.balance = 0;
        let createdAddress =  await AddressRepo.save(newAddress);
        if(!createdAddress) return { status: false, reason: "address not created error!", code: 1030 }
        return { status: true, result: createdAddress };
      } catch (error) {
        return { status: false, reason: "error server!"+error, code: 1022 };
      }
    },
    async sendfrom(ctx) {
      try {
        let TxService = new TransactionService(conn.getRepository(Device),conn.getRepository(Transaction),conn.getRepository(Address))
        const {fingerprint, account, amount,txid, chainid, from_address, to_address } = ctx.params as any;
        if (!to_address || !account || !amount) return { status: false, reason: "request error params!", code: 1023 };
        
        if (!to_address || !account || !amount) return { status: false, reason: "request error params!", code: 1023 };
        var responce = null;
        if(chainid == "LOG"){
          responce = await rpcClient.sendfrom(account, to_address, amount) as any;
        }
        console.log("sendfrom:",responce);
        
        if (!responce && chainid == "LOG") return { status: false, reason: "sendfrom faild!", code: 1024 };
        return await TxService.create_update(fingerprint, {
          account,
          amount,
          chainid,
          from_address,
          to_address,
          txid:chainid == "LOG" ? responce.result[0] : txid! 
        })
      } catch (error) {
        return { status: false, reason: "error server!"+error, code: 1025 };
      }
    },
    getFees(){
      return process.env.FEES;
    },
    async dumpprivkey(ctx) {
      try {
        const { address } = ctx.params as any;
        if (!address) return { status: false, reason: "request error params!", code: 1026 };
        let responce = await rpcClient.dumpprivkey(address);
        if (!responce) return { status: false, reason: "dumpprivkey faild!", code: 1027 };
        return { status: true, result: responce };
      } catch (error) {
        return { status: false, reason: "error server!", code: 1028 };
      }
    }
  }
} as Moleculer.ServiceSchema<Moleculer.ServiceSettingSchema>
)