import io from 'socket.io-client'
import TYPES from '../../../shared/message'
import {Map} from './map'

export class Connect {
  constructor () {
    this.socket = null
  }

  connect () {
    this.socket = io(`ws://${window.location.hostname}:3000`)
  }

  onConnect (callback) {
    this.socket.on('connect', () => {
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

  move (entity) {
    const {id, x, y, type, orientation} = entity
    const {rx, ry} = Map.getRelativePosition(x, y)
    this.socket.emit(TYPES.EVENTS.MOVE, {id, x: rx, y: ry, type, orientation})
  }

  onMove (callback) {
    this.socket.on(TYPES.EVENTS.MOVED, data => {
      callback(data)
    })
  }
}