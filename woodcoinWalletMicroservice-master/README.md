## NodeJS socketIO-RPC Microservices
### connection methods for frontend: 
`
export const IOPublic = io("wss://mcs.woodcoin.ru/public");
export const IOPrivate = io("wss://mcs.woodcoin.ru/private");
`
### (${HOST_URI}/public):
  `
  import * as io from "socket.io-client";
export const IOPublic = (secret: string, fingerprint: string) => io("wss://mcs.woodcoin.ru/public", {
    query:{
        secret: string,
        fingerprint: string,
    }
});
`

### (${HOST_URI}/private):
  `
  import * as io from "socket.io-client";
export const IOPrivate = (token: string, fingerprint: string) => io("wss://mcs.woodcoin.ru/private", {
    query:{
        token: string,
        fingerprint: string,
    }
});
`


