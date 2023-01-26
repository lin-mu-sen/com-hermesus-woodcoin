#!/usr/bin/env node
import 'dotenv/config'
import { ServiceBroker } from 'moleculer'
import fetch from 'node-fetch'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Brokerservices } from './broker.services'
// import { DevicesBrokerServices } from './broker.services/device'
// import { mtproto } from './tools'
import { cronJobs } from './tools/cron'
const SocketIOService = require('moleculer-io')
const redis = require('socket.io-redis')

const broker = new ServiceBroker()
createConnection()
  .then(async connection => {
    broker.createService({
      name: 'io',
      mixins: [SocketIOService],
      settings: {
        port: process.env.PORT || 5230,
        io: {
          options: {
            // adapter: redis({ host: 'localhost', port: 6379 }) as any
          },
          namespaces: {
            '/public':{
              authorization: false,
              events: {
                call: {
                  whitelist: ['device.recoverwallet', 'device.verifyToken', 'device.login']
                }
              }
            },
            '/private': {
              authorization: true,
              // middlewares: [],
              // packetMiddlewares:[],
              events: {
                call: {
                  whitelist: ['device.*', 'transaction.*', 'woodcoinrpc.*']
                }
              }
            },
            '/': {
              authorization: false,
              // middlewares: [],
              // packetMiddlewares:[],
              events: {
                call: {
                  whitelist: []
                }
              }
            }
          } // end namespaces
        } // end io
      },
      methods: {
        // Second thing
        async socketAuthorize(socket, eventHandler){
          // console.log(socket.handshake.query);
          let {fingerprint, token}= socket.handshake.query || { fingerprint:null, token:null };
          if (fingerprint && token) {
            try{
              let __dt = await this.broker.call("device.verifyToken", {fingerprint, token})
              if(!__dt.status) {
                socket.emit("try", {command: "restart"});
                throw new Error("invalid credentials")
              }
              return __dt; // valid credential, return the user
            }catch(err){
              socket.emit("try", {command: "restart"});
              throw new Error("invalid credentials") // invalid credentials
            }
          } else {
            socket.emit("try", {command: "restart"});
            throw new Error("invalid credentials") // invalid credentials
          }
        }
      }
    })
    
    broker.start().then(()=>{
      Brokerservices(broker, connection).then(()=>{
         console.log("\\\\= Brokerservices started =//");
      })
    })
  })
  .catch(error => console.log(error))
//      mtproto.call('help.getNearestDc', {}).then(result => {
//   console.log('country:', result.country)
// })
