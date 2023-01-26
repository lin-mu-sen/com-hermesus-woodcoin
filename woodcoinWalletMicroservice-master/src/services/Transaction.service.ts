import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { Address } from '../entity/Address'
import { Device } from '../entity/Device'
var toUint8Array = require('base64-to-uint8array')

import { Session } from '../entity/Session'
import { Transaction } from '../entity/Transactions'
import { DeviceType, Notify } from '../tools'
interface Payload {
  amount: number,
  to_address: string,
  from_address:string,
  account: string,
  txid:string,
  chainid:string
}
export class TransactionService {
  constructor(
    private DeviceRepository: Repository<Device>,
    private TransactionRepository: Repository<Transaction>,
    private AddressRepository: Repository<Address>
  ) { }
  public async create_update(fingerprint: string, payload: Payload) {
    console.log(payload);
    
    if (!fingerprint  || !payload || !payload.txid ) return { status: false, reason: "request error params!", code: 1007 };
    let foundDevice = await this.DeviceRepository.findOne({
      where: {
        fingerprint: fingerprint
      }
    });
    if (!foundDevice) return { status: false, reason: "device not found error!", code: 1008 };
    let foundTransaction = await this.TransactionRepository.findOne({
      where: {
        txid: payload.txid
      }
    })
    if (!foundTransaction) return await this.create(foundDevice, payload);
    return await this.update(foundTransaction, foundDevice, payload);
  }
  update(foundTransaction: Transaction, device: Device, payload: any) {
    try {
      delete payload.txid;
      let created_transaction  = this.TransactionRepository.save({...foundTransaction, ...payload, device: device});
      if(!created_transaction) return { status: false, reason: "transaction faild error!", code: 1009 };
      return { status: true, result:created_transaction};
     } catch (error) {
      return { status: false, reason: "server error!"+error, code: 1010 };
    }
  }
  async create(device: Device, payload: Payload) {

    let notifier = new Notify(device.platform == "android" ? DeviceType.ANDROID :DeviceType.IOS);
    notifier.send(device.onSignal, `Your txid: ${payload.txid}`);
    try {
      var _from_address = await this.AddressRepository.findOne({
        where:{
          address:payload.from_address
        }
      })
      if(!_from_address) {
        _from_address =  new Address();
        _from_address.address = payload.from_address;
        _from_address.chainid = payload.chainid;
        _from_address.status = true;
        _from_address.device = device;
        _from_address.balance = 0;
        await this.AddressRepository.save(_from_address);
      }
      var _to_address = await this.AddressRepository.findOne({
        where:{
          address:payload.to_address
        },
        relations:["device"]
      })
      if(_to_address && _to_address.device){
        notifier.send(_to_address.device.onSignal, `You received ${payload.amount}LOG from address ${payload.from_address}, check transaction id: ${payload.txid}`);
      }
      if(!_to_address) {
        _to_address =  new Address();
        _to_address.address = payload.to_address;
        _to_address.chainid = payload.chainid;
        _to_address.status = true;
        _to_address.device = null;
        _to_address.balance = Number(payload.amount || (Number(process.env.FEES || 0.001)))-Number(process.env.FEES || 0.001);
        await this.AddressRepository.save(_to_address);
      }
      let newtransaction = new Transaction();
      newtransaction.account = device.account;
      newtransaction.amount = payload.amount;
      newtransaction.from_address = _from_address!;
      newtransaction.to_address = _to_address!;
      newtransaction.txid = payload.txid;
      newtransaction.device = device;
      newtransaction.status = 1;
      newtransaction.received = false;
      let created_transaction  = this.TransactionRepository.save(newtransaction);
      if(!created_transaction) return { status: false, reason: "transaction faild error!", code: 1009 };
      return { status: true, result:created_transaction};
     } catch (error) {
      return { status: false, reason: "server error!"+error, code: 1031 };
    }
  }
}
