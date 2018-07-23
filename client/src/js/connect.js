import io from 'socket.io-client'
import TYPES from '../../../shared/gametypes'

export class Connect {
  constructor () {
    this.socket = null
  }

  connect (striker, callback) {
    this.socket = io('ws://localhost:3000')
    this.socket.on('connect', () => {
      this.socket.emit(TYPES.EVENTS.INIT, {...striker})
      this.onMessage(callback)
    })
  }

  onMessage (callback) {
    this.receiveInitFinish(callback)
  }

  receiveInitFinish (callback) {
    this.socket.on(TYPES.EVENTS.INIT_FINISH, data => {
      console.log(data)
      callback(data)
    })
  }
}