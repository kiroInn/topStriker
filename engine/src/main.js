let server = require('http').createServer()
let io = require('socket.io')(server)
let TYPES = require('../../shared/gametypes')
let INFO = require('./const')

let gameInfo = []

io.on('connection', function (client) {
  console.log('client connection')

  client.on(TYPES.EVENTS.INIT, (data) => {
    console.log(`on event ${TYPES.EVENTS.INIT}`, data)
    let {uuid, name} = data
    let number = gameInfo.length + 1
    if (number < INFO.LIMIT_NUMBER) {
      let striker = {name, uuid, x: 150, y: number * 2.5}
      client.emit(TYPES.EVENTS.INIT_FINISH, striker)
    }
  })

  client.on(TYPES.EVENTS.MOVE, function (data) {
    console.log(`on event ${TYPES.EVENTS.MOVE}`, data)
  })

  client.on('disconnect', function () {
    console.log('on disconnect')
  })
})

server.listen(3000)
console.log('Top striker engine is starting...')