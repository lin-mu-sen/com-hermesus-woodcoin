import { NativeModules } from "react-native"
// console.log("NativeModules",NativeModules);

interface RCTSVPModuletype {
        getstatus(): any;
        createwallet: ()=>Promise<any>
};
export const SVPModule:RCTSVPModuletype = NativeModules.RNSPVModule;
var coinparams = require("../assets/woodcoin.json");
export const LOG = {
    params : coinparams
}