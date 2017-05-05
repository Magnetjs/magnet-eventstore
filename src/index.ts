import { Module } from 'magnet-core/module'
import * as eventstore from 'eventstore'
import * as _promise from 'bluebird'

export default class MagnetEventstore extends Module {
  get moduleName () { return 'eventstore' }
  get defaultConfig () { return __dirname }

  async setup () {
    this.insert(eventstore(this.config))

    _promise.promisifyAll(this.app.eventstore)

    this.app.eventstore.on('connect', () => {
      this.log.info('storage connected')
    })

    this.app.eventstore.on('disconnect', () => {
      this.log.error('connection to storage is gone')
    })

    await this.app.eventstore.initAsync()
  }
}
