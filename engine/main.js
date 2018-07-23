let server = require('http').createServer()
let io = require('socket.io')(server)
let TYPES = require('../shared/gametypes')

console.log(TYPES)

io.on('connection', function (client) {
  console.log('client connection')
  client.on(TYPES.EVENTS.MOVE, function (data) {
    console.log('on event', data)
  })
  client.on('disconnect', function () {
    console.log('on disconnect')
  })
})

server.listen(3000)
console.log('Top striker engine is starting...')