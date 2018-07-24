let server = require('http').createServer()
let io = require('socket.io')(server)
let TYPES = require('../../shared/gametypes')
let INFO = require('./const')
let _ = require('lodash')

let gameInfo = []

io.on('connection', function (client) {
  console.log('client connection')
  client.on(TYPES.EVENTS.INIT, (data) => {
    console.log(`on event ${TYPES.EVENTS.INIT}`, data)
    let {id, name} = data
    let number = gameInfo.length + 1
    if (number < INFO.LIMIT_NUMBER) {
      let striker = {name, id, x: 150, y: number * 2.5}
      gameInfo.push(striker)
      client.emit(TYPES.EVENTS.ON_INIT, striker)
    }
  })

  client.on(TYPES.EVENTS.MOVE, function (data) {
    console.log(`on event ${TYPES.EVENTS.MOVE}`, data)
    const {id, x, y} = data
    _.map(gameInfo, item => {
      if (_.get(item, 'id') === id) return {...item, x, y}
      return item
    })
    client.emit(TYPES.EVENTS.ON_MOVE, data)
  })

  client.on('disconnect', function () {
    console.log('on disconnect')
  })
})

server.listen(3000)
console.log('Top striker engine is starting...')