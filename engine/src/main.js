let server = require('http').createServer()
let io = require('socket.io')(server)
let TYPES = require('../../shared/gametypes')
let INFO = require('./const')
let _ = require('lodash')

let strikers = []

io.on('connection', function (client) {

  client.on(TYPES.EVENTS.INITIAL, (data) => {
    console.log(`on event ${TYPES.EVENTS.INITIAL}`, data)
    let {id, name} = data
    let number = strikers.length + 1
    if (number < INFO.LIMIT_NUMBER) {
      let striker = {name, id, x: 150, y: number * 2.5}
      strikers.push(striker)
      io.emit(TYPES.EVENTS.INITIALED, strikers)
    } else {
      console.log('strikers is fully')
    }
  })

  client.on(TYPES.EVENTS.MOVE, function (data) {
    console.log(`on event ${TYPES.EVENTS.MOVE}`, data)
    const {id, x, y} = data
    _.map(strikers, item => {
      if (_.get(item, 'id') === id) return {...item, x, y}
      return item
    })
    io.emit(TYPES.EVENTS.MOVED, data)
  })

  client.on('disconnect', function () {
    console.log('on disconnect')
  })
})

server.listen(3000)
console.log('Top striker engine is starting...')