import { BrokerNode, BrokerOptions, ServiceBroker } from "moleculer";
import Moleculer = require("moleculer");
import { JWTSignOptions, privateKey, publicKey, verifyOptions } from '../tools/cron'
import * as jwt from "jsonwebtoken"
import { DeviceService } from "../services/Device.service";
import { Connection } from "typeorm";
import { Device } from "../entity/Device";
import { Session } from "../entity/Session";
export const DevicesBrokerServices = (broker: ServiceBroker, conn: Connection) => broker.createService({
  name: "device",
  actions: {
    async verifyToken(ctx) {
      const { fingerprint, token } = ctx.params ;
      let deviceservices = new DeviceService(conn.getRepository(Device), conn.getRepository(Session))
      return await deviceservices.verifyToken(
        fingerprint,
        token
      );
    },
    async login(ctx) {
      const { fingerprint, token , secret} = ctx.params || {fingerprint: null, token: null, secret: null} ;
      let deviceservices = new DeviceService(conn.getRepository(Device), conn.getRepository(Session))
      return await deviceservices.login(
        fingerprint,
        token,
        secret
      );
    },
   async recoverwallet(ctx) {
      // console.log("recoverwallet:",ctx.params);
      
        const { figerprint, secret, onsignal, platform, isnew } = ctx.params || { platform:null, figerprint:null,isnew:null, secret:null, onsignal:null };
        let deviceservices = new DeviceService(conn.getRepository(Device), conn.getRepository(Session))
        return await deviceservices.recoverwallet({
          figerprint,
          secret,
          onsignal,
          platform,
          isnew
        })
    }
  }
} as Moleculer.ServiceSchema<Moleculer.ServiceSettingSchema>
)