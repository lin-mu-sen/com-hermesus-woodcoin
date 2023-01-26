import { ServiceBroker } from "moleculer";
import { Connection } from "typeorm";
import { DevicesBrokerServices } from "./device";
import {  TransactionBrokerServices } from "./transactions";
import {  WoodcoinRpcBrokerServices } from "./woodcoinrpc";

export  async function  Brokerservices(broker:ServiceBroker,conn:Connection){
    console.log("Start Loading Services ..... >> ");
   try {
    DevicesBrokerServices(broker, conn);
    TransactionBrokerServices(broker, conn);
    WoodcoinRpcBrokerServices(broker, conn);
   } catch (error) {
       throw new Error("Error Loading Services << :"+JSON.stringify(broker.getHealthStatus()));
   }
}
  // broker.createService({
    //   name: 'delivery',
    //   actions: {
    //     calculate(ctx) {
    //       const minimuePrice = 40; //"rub"
    //       const minimuePricefast = 50; //"rub"
    //       const pricePerKilo = 10; //"rub"
    //       const fastDelivery = 8;// "km/h"
    //       const averageSpeed = 5;  // "km/h"
    //       // curl 'http://127.0.0.1:5050/route/v1/foot/55.744670,37.563705;55.744932,37.562073?overview=false'
    //       const API_ENDPOINT = (user_location, store_location) => `http://127.0.0.1:5059/route/v1/foot/${String(user_location)};${String(store_location)}?overview=false`;
    //       const GEOCODER_API_ENDPOINT = (lat, long) => `http://127.0.0.1:5159/reverse?format=json&lat=${String(lat)}&lon=${String(long)}&zoom=18&addressdetails=1`;
    //       return new Promise(async (resolve, reject) => {
    //         let req = ctx.params as any;
    //         try {
    //           if (req) {
    //             if (req.coords) {           
    //               let response = await fetch(API_ENDPOINT(`${req.coords.longitude},${req.coords.latitude}`, stores[req.storeid].cords))
    //               let res_address = await fetch(GEOCODER_API_ENDPOINT(req.coords.latitude,req.coords.longitude))
    //               if (response) {
    //                 const results = await response.json(); 
    //                 const results_geocoder = await res_address.json(); 
    //                 if(results.code == "Ok"){
    //                   let fast_del = (data)=>({
    //                     distance: (data.distance).toFixed(2)+"м",
    //                     duration: (((data.distance/1000)/fastDelivery)*60).toFixed()+"мин",
    //                     price: (minimuePricefast+ ((data.distance/1000)*pricePerKilo)).toFixed(2)+"₽"
    //                   })
    //                   let normal_del = (data)=>({
    //                     distance: (data.distance).toFixed(2)+"м",
    //                     duration: (((data.distance/1000)/averageSpeed)*60).toFixed()+"мин",
    //                     price: (minimuePrice+ ((data.distance/1000)*pricePerKilo)).toFixed(2)+"₽"
    //                   })
    //                   let _delvs = results.routes[0] ?  [fast_del(results.routes[0]),normal_del(results.routes[0])] : [];
    //                   resolve({status:true,result:{list:_delvs, address:results_geocoder.display_name}})
    //                 } else {
    //                   reject({status:false,error:"no routes"})
    //                 }
    //               }
    //             }
    //           }
    //         } catch (error) {
    //           if(error){
    //             console.log(error);
    //             reject({status:false,error:"error"})
                
    //           }
    //         }

    //       })
    //     },
    //   }
    // })