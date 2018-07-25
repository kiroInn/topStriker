import io from 'socket.io-client'
import TYPES from '../../../shared/gametypes'

export class Connect {
  constructor () {
    this.socket = null
  }

  connect () {
    this.socket = io('ws://localhost:3000')
  }

  onConnect (callback) {
    this.socket.on(TYPES.EVENTS.CONNECTED, () => {
      callback()
    })
  }

  init (striker) {
    const {id, name} = striker
    this.socket.emit(TYPES.EVENTS.INITIAL, {id, name})
  }

  onInit (callback) {
    this.socket.on(TYPES.EVENTS.INITIALED, data => {
      callback(data)
    })
  }

  move (striker) {
    const {id, name, x, y} = striker
    this.socket.emit(TYPES.EVENTS.MOVE, {id, name, x, y})
  }

  onMove (callback) {
    this.socket.on(TYPES.EVENTS.MOVED, data => {
      callback(data)
    })
  }
}