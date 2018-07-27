import io from 'socket.io-client'
import TYPES from '../../../shared/message'

export class Connect {
  constructor () {
    this.socket = null
  }

  connect () {
    this.socket = io(`ws://${window.location.hostname}:3000`)
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
    const {id, x, y} = striker
    this.socket.emit(TYPES.EVENTS.MOVE, {id, x, y})
  }

  onMove (callback) {
    this.socket.on(TYPES.EVENTS.MOVED, data => {
      callback(data)
    })
  }
}