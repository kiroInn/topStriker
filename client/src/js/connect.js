import io from 'socket.io-client'
import TYPES from '../../../shared/gametypes'

const socket = io('http://localhost:3000')

export class Connect {
  constructor () {
    socket.on('connect', () => {
      console.log('connect')
      socket.emit(TYPES.EVENTS.MOVE, {id: 'kiroli', x: 10, y: 20})
    })
  }
}