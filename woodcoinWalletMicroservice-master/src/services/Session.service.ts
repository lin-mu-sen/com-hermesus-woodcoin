import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import fetch from 'node-fetch'
import * as phoneToken from 'generate-sms-verification-code'
import * as moment from 'moment'
import { appendFile, appendFileSync, existsSync }  from "graceful-fs";
import { join } from "path"
import { isNumber } from 'util'
import { read, AUTO, MIME_PNG, RESIZE_BEZIER } from 'jimp';
import { mtproto } from '../tools'
import { Device } from '../entity/Device'
var toUint8Array = require('base64-to-uint8array');

import { Session } from '../entity/Session'
export class SessionService {
  constructor(
    private SessionRepository: Repository<Session>,
    private DeviceRepository: Repository<Device>
  ) { }
   public async add(){
    this.SessionRepository.save(new Session())
   }
}
