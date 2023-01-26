import { BrokerNode, BrokerOptions, ServiceBroker } from "moleculer";
import * as Moleculer from "moleculer";
import { TransactionService } from "../services/Transaction.service";
import { Connection } from "typeorm";
import { Device } from "../entity/Device";
import { Transaction } from '../entity/Transactions'
import { Address } from "../entity/Address";

export const TransactionBrokerServices = (broker: ServiceBroker, conn: Connection) => broker.createService({
  name: "transaction",
  actions: {
    async create_update(ctx){
      const { fingerprint, payload} = ctx.params || { fingerprint:null, payload:{txid:null} };
      let transactionService = new TransactionService(conn.getRepository(Device), conn.getRepository(Transaction), conn.getRepository(Address))
      return await transactionService.create_update(
        fingerprint,
        payload
      );
    }
  }
} as Moleculer.ServiceSchema<Moleculer.ServiceSettingSchema>
)