let server = require('http').createServer()
let io = require('socket.io')(server)
let TYPES = require('../../shared/message')
let INFO = require('./const')
let _ = require('lodash')

let strikers = []
let ball = {x: 100, y: 100}

io.on('connection', function (client) {

  console.log('connection...')
  client.on(TYPES.EVENTS.INITIAL, (data) => {
    console.log(`on event ${TYPES.EVENTS.INITIAL}`, data)
    let {id, name} = data
    let number = strikers.length + 1
    if (number < INFO.LIMIT_NUMBER) {
      let striker = {name, id, x: 150, y: number * 70}
      strikers.push(striker)
      console.log('strikers', strikers)
      io.emit(TYPES.EVENTS.INITIALED, {strikers, ball})
    } else {
      console.log('strikers is fully')
    }
  })

  client.on(TYPES.EVENTS.MOVE, function (data) {
    console.log(`on event ${TYPES.EVENTS.MOVE}`, data)
    const {type} = data
    if (type === TYPES.ENTITIES.STRIKER) {
      updateStrikers(data)
    }
    if (type === TYPES.ENTITIES.BALL) {
      updateBall(data)
    }
    io.emit(TYPES.EVENTS.MOVED, data)
  })

  client.on('disconnect', function () {
    console.log('on disconnect')
  })
})

function updateStrikers ({id, x, y}) {
  _.each(strikers, item => {
    if (_.get(item, 'id') === id) {
      item.x = x
      item.y = y
    }
  })
}

function updateBall ({x, y}) {
  ball.x = x
  ball.y = y
}

server.listen(3000)
console.log('Top striker engine is starting...')