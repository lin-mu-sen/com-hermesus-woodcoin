import {CronJob} from "cron";
import { Connection } from "typeorm";
import { Licence } from "../entity/Licence";
import { LicenceService } from "../services/Licence.service";
import fs = require("fs");
import { Algorithm } from "jsonwebtoken"
var base32 = require('thirty-two');
export const cronJobs = (con:Connection) => new CronJob('0 0 0 * * *', function () {
    // let licenceservices = new LicenceService(con.getRepository(Licence));
    // licenceservices.removeExpired()
})
export const _string_from_date = (d:Date)=>d.toLocaleDateString().split(/[,]/g)[0].replace(/[ ]/g, "");
export const to_time_stamp = (d:Date)=>d.toJSON().slice(0, 19).replace('T', ' ')
export const authurl = (key:string, label:string, issuer:string)=>`otpauth://totp/${label}?secret=${base32.encode(key).toString().replace(/=/g,'')}&algorithm=SHA512&digits=6&period=30&issuer=${issuer}`
export const privateKey = fs.readFileSync('sessions.key', 'utf8');
export const publicKey = fs.readFileSync('sessions.key.pub', 'utf8');
export const JWTSignOptions = {
    algorithm: "RS256" as Algorithm,
    expiresIn: '1d'
};
export const verifyOptions = {
    algorithms: ['RS256'] as Algorithm[]
};