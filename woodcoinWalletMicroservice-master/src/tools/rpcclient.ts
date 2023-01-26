/**
 * made by @KM8Oz
 */
const Client = require('bitcoin-core');
interface RpcReturned {
  result: any[], error:any, id:any
}
class WoodcoinClient {
  RPCUSER = 'woodcoinrpc';
  RPCPASS = 'CaMuLoStzWx13sPvPqRUM5SnbmYifTpdfZjgnMa5H6NH';
  client;
  minamount = .001;
  constructor(minamount?:number) {
    minamount ? (this.minamount = minamount): minamount;
    this.client = new Client({ port: 9338, password: this.RPCPASS, username: this.RPCUSER });
  }
  getbalance(name) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!name || typeof name != "string") resolve({
          status: false,
          reason: "input error!"
        });
        const batch = [
          { method: 'getbalance', parameters: [name] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  validateaddress(address) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!address || typeof address != "string") resolve({
          status: false,
          reason: "input error!"
        });
        const batch = [
          { method: 'validateaddress', parameters: [address] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  getAlltransactions(account:string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!account || typeof account != "string") resolve({
          status: false,
          reason: "input error!"
        });
        const batch = [
          { method: 'listtransactions', parameters: [account] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        console.log(error);
        reject(null)
        
      }
    })
  }
  /**
   * 
   * @param account account id
   * @returns account LOG address
   */
  // curl --user woodcoinrpc:CaMuLoStzWx13sPvPqRUM5SnbmYifTpdfZjgnMa5H6NH --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": ["kimotest"] }' -H 'content-type: text/plain;' http://127.0.0.1:9338/
  newAccount(account:string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!account || typeof account != "string") resolve({
          status: false,
          reason: "input error!"
        });
        const batch = [
          { method: 'getnewaddress', parameters: [account] }
        ];
        let resp = await this.client.command(batch) as RpcReturned;
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  // curl --user woodcoinrpc:CaMuLoStzWx13sPvPqRUM5SnbmYifTpdfZjgnMa5H6NH --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressesbyaccount", "params": ["kimotest"] }' -H 'content-type: text/plain;' http://127.0.0.1:9338/
  getacountAddresses(account: string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!account || typeof account != "string") resolve({
          status: false,
          reason: "input error!"
        });
        const batch = [
          { method: 'getaddressesbyaccount', parameters: [account] }
        ];
        let resp = await this.client.command(batch) as RpcReturned ;
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  getaccount(name) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!name || typeof name != "string") resolve({
          status: false,
          reason: "input error!"
        });
        const batch = [
          { method: 'getaccount', parameters: [name] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  getdifficulty() {
    return new Promise(async (resolve, reject) => {
      try {
        const batch = [
          { method: 'getdifficulty', parameters: [] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  getrawtransaction(txid, blockhash = "") {
    return new Promise(async (resolve, reject) => {
      try {
        if (!txid || typeof txid != "string") resolve({
          status: false,
          reason: "input error!"
        });
        const batch = [
          { method: 'getrawtransaction', parameters: [txid, true, blockhash] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  listtransactions(search = "*", min = 0, max = 10) {
    return new Promise(async (resolve, reject) => {
      try {
        const batch = [
          { method: 'listtransactions', parameters: [search, min, max] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  dumpprivkey(address) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!address || typeof address != "string") resolve({
          status: false,
          reason: "input error!"
        });
        const batch = [
          { method: 'listtransactions', parameters: [address] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  setaccount(address, account) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!address || typeof address != "string") resolve({
          status: false,
          reason: "input error (privkey)!"
        });
        if (!account || typeof account != "string") resolve({
          status: false,
          reason: "input error (label)!"
        });
        //importprivkey "mykey" "testing" false
        const batch = [
          { method: 'setaccount', parameters: [address, account] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  sendfrom(account, address, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!amount || !Number(amount) || Number(amount) < this.minamount) resolve({
          status: false,
          reason: "input error (amount)!"
        });
        if (!account || typeof account != "string") resolve({
          status: false,
          reason: "input error (account)!"
        });
        if (!address || typeof address != "string") resolve({
          status: false,
          reason: "input error (address)!"
        });
        //importprivkey "mykey" "testing" false
        const batch = [
          { method: 'sendfrom', parameters: [account, address, amount] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  getaccountaddress(account) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!account || typeof account != "string") resolve({
          status: false,
          reason: "input error (account)!"
        });
        //importprivkey "mykey" "testing" false
        const batch = [
          { method: 'getaccountaddress', parameters: [account] }
        ];
        let resp = await this.client.command(batch);
        if (!resp) resolve({
          status: false,
          reason: 'emty reply!'
        });
        resolve({
          status: true,
          result: resp
        });
      } catch (error) {
        reject(error)
      }
    })
  }
}
export { WoodcoinClient };