import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import * as phoneToken from 'generate-sms-verification-code'
import * as moment from 'moment'
import { Algorithm, sign, verify } from "jsonwebtoken"
import * as twilio from 'twilio'
import { appendFile, appendFileSync, existsSync } from "graceful-fs";
import { join } from "path"
import { isNumber } from 'util'
import { authenticator, hotp, totp } from 'otplib';
import { read, AUTO, MIME_PNG, RESIZE_BEZIER } from 'jimp';
import { DeviceType, mtproto, Notify } from '../tools'
import { Device } from '../entity/Device'
// import { totp } from 'notp'
import { Session } from '../entity/Session'
import { JWTSignOptions, privateKey } from '../tools/cron'
import { add } from 'date-fns'
import { uuid58 } from 'uuid-base58'
import { privateKEY, publicKEY, signOptions } from "../tools/keys"

var Mnemonic = require('bitcore-mnemonic');
const bip39 = require('bip39');
// bip39.generateMnemonic()
var toUint8Array = require('base64-to-uint8array')
export class DeviceService {
  constructor(
    private DeviceRepo: Repository<Device>,
    private SessionRepo: Repository<Session>
  ) { }
  // authantication logics 
  public async recoverwallet(payload: {
    figerprint: string,
    secret: string,
    onsignal: string,
    platform: string,
    isnew?:boolean
  } | null) {
    try {
      // payload check step 
      if (!payload || !payload.figerprint || !payload.secret || typeof payload.figerprint != "string" || typeof payload.secret != "string") return { status: false, reason: "request error params!", code: 1000 };
      // device check step 
      let hex = payload.secret.replace(/[ ]/g, "-");
      const foundDevice = await this.DeviceRepo.findOne({
        where: {
          passphrase: hex
        }
      });
      if (!foundDevice) {
        let created = await this.NewDevicerRegistration(payload.figerprint, payload.onsignal, payload.platform, !!payload.isnew);
        if (!created.ok) return { status: false, reason: created.error, code: 1002 };
        return { status: true, result: created.device };
      }
      let session = new Session();
      var _payload = {
        createdAt: new Date().getTime(),
        createFor: payload.figerprint
      };
      session.token = sign(_payload, privateKEY, signOptions);
      session.fingerprint = payload.figerprint;
      foundDevice.session = session;
      foundDevice.fingerprint = payload.figerprint;
      foundDevice.onSignal = payload.onsignal;
      foundDevice.platform = payload.platform || "android";
      try {
        let olddevice = await this.DeviceRepo.save(foundDevice);
        return { status: true, result: JSON.stringify(olddevice) };
      } catch (error) {
        return { status: false, reason: "old device registration error!", code: 1003 };
      }
    } catch (error) {
      if(error) console.error(error);
      
      return { status: false, reason: "server error!", code: 1001 };
    }
  }
  async generateUniquePhrases() {
    var code = bip39.generateMnemonic();
    var hex = code.replace(/[ ]/g, "-");
    var found = await this.DeviceRepo.findOne({
      where: {
        passphrase: hex
      }
    });
    if (!found) return hex;
    var code = bip39.generateMnemonic();
    var hex = code.replace(/[ ]/g, "-");
    var found = await this.DeviceRepo.findOne({
      where: {
        passphrase: hex
      }
    });
    return hex;
  }
  async NewDevicerRegistration(figerprint: string, onsignal: string, platform: string, isnew?:boolean) {
    // console.log("new device:", figerprint, onsignal);
    let notifier =  new Notify(DeviceType.ANDROID);
    isnew ? notifier.send(onsignal, "hi! your wallet is ready! try save your recovery passphrase")
    : notifier.send(onsignal, "someting happing ! we can't recover your woodcoin wallet, send a recovey request to support");
    // await this.DeviceRepo.softDelete({
    //   fingerprint: figerprint
    // })
    try {
      let device = new Device();
      let session = new Session();
      var payload = {
        createdAt: new Date().getTime(),
        createFor: figerprint
      };
      session.fingerprint = figerprint;
      session.token = sign(payload, privateKEY, signOptions);
      session.expiresOn = add(new Date(), { hours: 12 });
      device.account = uuid58();
      device.active = true;
      device.session = session;
      device.onSignal = onsignal;
      device.transactions = [];
      device.platform = platform || "android";
      device.fingerprint = figerprint;
      device.passphrase = await this.generateUniquePhrases();
      let _device = await this.DeviceRepo.save(device);
      return { ok: true, device: _device };
    } catch (error) {
      console.log("NewDevicerRegistration error:", error);
      return { ok: false, error };
    }
  }
  public async verifyToken(figerprint: string, token: string) {
    try {
      if (!token || typeof token != "string") return { status: false, reason: "request error params!", code: 1004 };
      var i = 'WOODCOIN DEVELOPEMENT LTD';          // Issuer 
      var s = 'contact@woodcoin.org';        // Subject 
      var a = 'https://woodcoin.org'; // Audience// SIGNING OPTIONS
      const signoptions = {
        issuer: i,
        subject: s,
        audience: a,
        maxAge: "12h",
        algorithms:["RS256"] as Algorithm[]
      };
      var legit = verify(token, publicKEY, signoptions) as any;
      if (!legit || !legit.createFor || legit.createFor != figerprint) return { status: false, reason: "non authanticated device!", code: 1005 };
      return { status: true, result: JSON.stringify(legit) };
    } catch (error) {
      return { status: false, reason: "server error!" + error, code: 1006 };
    }
  }
  public async login(figerprint: string, token: string, secret: string) {
    try {
      if (!figerprint || !secret ) return { status: false, reason: "request error params!", code: 1044 };
      
      let hex = secret.replace(/[ ]/g, "-");

      const foundDevice = await this.DeviceRepo.findOne({
        where: {
          passphrase: hex
        },
        relations:["session"]
      });
      var i = 'WOODCOIN DEVELOPEMENT LTD';          // Issuer 
      var s = 'contact@woodcoin.org';        // Subject 
      var a = 'https://woodcoin.org'; // Audience// SIGNING OPTIONS
      const signoptions = {
        issuer: i,
        subject: s,
        audience: a,
        maxAge: "12h",
        algorithms:["RS256"] as Algorithm[]
      };
      var legit = token ? verify(token, publicKEY, signoptions) as any : {createFor:null};
      if (!legit || !legit.createFor || legit.createFor != figerprint) {
        if(!foundDevice) return { status: false, reason: "non authanticated device!", code: 1005 }
        let session = new Session();
        var _payload = {
          createdAt: new Date().getTime(),
          createFor: figerprint
        };
        session.token = sign(_payload, privateKEY, signOptions);
        session.fingerprint = figerprint;
        foundDevice.session = session;
        foundDevice.fingerprint = figerprint;
        let olddevice = await this.DeviceRepo.save(foundDevice) as any;
        delete olddevice.passphrase;
        return { status: true, result: olddevice }
      };
      return { status: true, result: JSON.stringify(legit) };
    } catch (error) {
      return { status: false, reason: "server error!" + error, code: 1006 };
    }
  }
}
