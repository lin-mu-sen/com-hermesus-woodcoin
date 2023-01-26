enum DeviceType {
    ANDROID = 0,
    IOS = 1
}
import { Client } from "onesignal-node";
class Notify {
    client: Client;
    constructor(type: DeviceType) {
        switch (type) {
            case DeviceType.IOS:
                this.client = new Client(process.env.IOS_ONESIGNAL_APP, process.env.IOS_ONESIGNAL_KEY)
                break;
            default:
                this.client = new Client(process.env.ANDROID_ONESIGNAL_APP, process.env.ANDROID_ONESIGNAL_KEY)
                break;
        }
    }
    send(id:string, message:string) {
        return this.client.createNotification({
            contents: {
                'fr': message,
                'en': message,
            },
            include_player_ids: [id]
        })
        //838e2cf0-5b3d-4db1-a76e-e718c8104d24
    }
}

export { Notify, DeviceType };