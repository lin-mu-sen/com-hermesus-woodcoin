import SocketIOClientStatic from "socket.io-client";
var base_url = "wss://mcs.woodcoin.ru";
class Socket {
    public private: SocketIOClient.Socket;
    public public: SocketIOClient.Socket;
    constructor(fingerPrint: string, token: string) {
        this.public = SocketIOClientStatic(`${base_url}/public`, { forceNew: false })
        this.private = SocketIOClientStatic(`${base_url}/private`, {
            forceNew: false, query: {
                fingerprint: fingerPrint || null,
                token
            }
        })
    }
    recovery({ figerprint, secret }: { figerprint: string, secret: string }) {
        return new Promise((resolve, reject) => {
            this.public.emit('call', 'device.recoverwallet', { figerprint, secret },
                function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    }
    verifyToken({ figerprint, token }: { figerprint: string, token: string }) {
        return new Promise((resolve, reject) => {
            this.public.emit('call', 'device.verifyToken', { figerprint, token },
                function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    }
    sendtransaction({ fingerprint, payload }: { fingerprint: string, payload: { txid: string, account: string, amount: number, from_address: string, to_address: string } }) {
        return new Promise((resolve, reject) => {
            this.private.emit('call', 'transaction.create_update', { fingerprint, payload },
                function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    }
    getbalance({address}:{address:string}) {
        return new Promise((resolve, reject) => {
            this.private.emit('call', 'woodcoinrpc.getbalance', { address },
                function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    }
    getaccount({address}:{address:string}) {
        return new Promise((resolve, reject) => {
            this.private.emit('call', 'woodcoinrpc.getaccount', { address },
                function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    }
    sendfrom({address, account , amount}:{address:string,account:string,amount:string}) {
        return new Promise((resolve, reject) => {
            this.private.emit('call', 'woodcoinrpc.sendfrom', { address, account , amount },
                function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    }
    getkey({address}:{address:string}) {
        return new Promise((resolve, reject) => {
            this.private.emit('call', 'woodcoinrpc.dumpprivkey', { address },
                function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    }
    setaccount({address, account}:{address:string, account:string}) {
        return new Promise((resolve, reject) => {
            this.private.emit('call', 'woodcoinrpc.setaccount', { address, account },
                function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    }
    getaccountaddress({account}:{account:string}) {
        return new Promise((resolve, reject) => {
            this.private.emit('call', 'woodcoinrpc.getaccountaddress', { account },
                function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    }
}
export default Socket;