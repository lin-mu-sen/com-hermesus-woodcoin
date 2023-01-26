const path = require('path')
const MTProto = require('@mtproto/core')
const { sleep } = require('@mtproto/core/src/utils/common')
const tempStorage = require('@mtproto/core/src/storage/temp')
const { Api, TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const { TELEG_API_ID, TELEG_API_KEY, BOT_TOKEN } = process.env as any

class API {
  private mtproto: any
  constructor() {
    this.mtproto = new MTProto({
      api_id: TELEG_API_ID,
      api_hash: TELEG_API_KEY,

      storageOptions: {
        instance: tempStorage
      }
    })
  }

  async sendCode(phone_number: string) {
    try {
      const session = new StringSession('') // You should put your string session here
      const client = new TelegramClient(session, Number(TELEG_API_ID), TELEG_API_KEY, { connectionRetries: 5 })
      // await client.start({
      //     botAuthToken: BOT_TOKEN,
      // });
      // await client.session.save()
      await client.connect() // This assumes you have already authenticated with .start()

      const result = await client.invoke(
        new Api.auth.SendCode({
          phoneNumber: phone_number,
          apiId: Number(TELEG_API_ID),
          apiHash: TELEG_API_KEY,
          settings: new Api.CodeSettings({
            allowFlashcall: true,
            currentNumber: true,
            allowAppHash: true
          })
        })
      )
      console.log(result) // prints the result
      return { result, error: null }
    } catch (error) {
      console.log(error)
      return { error, result: null }
    }
  }

  async call(method, params, options = {}) {
    try {
      const result = await this.mtproto.call(method, params, options)

      return result
    } catch (error) {
      console.log(`${method} error:`, error)

      const { error_code, error_message } = error

      if (error_code === 420) {
        const seconds = Number(error_message.split('FLOOD_WAIT_')[1])
        const ms = seconds * 1000

        await sleep(ms)

        return this.call(method, params, options)
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_')

        const dcId = Number(dcIdAsString)

        // If auth.sendCode call on incorrect DC need change default DC, because
        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId)
        } else {
          Object.assign(options, { dcId })
        }

        return this.call(method, params, options)
      }

      return Promise.reject(error)
    }
  }
}

const mtproto = new API()

export { mtproto }
