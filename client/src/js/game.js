import _ from 'lodash'
import {Striker} from './striker'
import {Renderer} from './renderer'
import {requestAnimationFrame} from './util'
import {Sprite} from './sprite'
import {Connect} from './connect'
import TYPES from '../../../shared/gametypes';

export class Game {
  constructor () {
    this.keysDown = {}
    this.imager = {}
    this.renderer = new Renderer(this)
    this.striker = null
    this.strikers = []
    this.connecter = null
    this.then = new Date()
    window.addEventListener('keydown', e => {
      this.keysDown[e.keyCode] = true
      if (_.has(this.striker, 'isMoving')) this.striker.isMoving = true
    }, false)

    window.addEventListener('keyup', (e) => {
      delete this.keysDown[e.keyCode]
      if (_.has(this.striker, 'isMoving')) this.striker.isMoving = false
    }, false)
  }

  buildStriker ({id, name}) {
    let striker = new Striker({id, name})
    striker.setSprite(new Sprite('nyan'))
    return striker
  }

  connect (striker) {
    this.connecter = new Connect()
    this.connecter.connect(striker)
    this.receive(this.connecter.socket)
    this.run()
  }

  receive (client) {
    // striker init finish
    this.connecter.onMove(values => {
      let strikers = []
      _.each(values, value => {
        let striker = this.buildStriker(value)
        if (_.get(value, 'id') === striker.id) this.striker = striker
        strikers.push(striker)
      })
      this.strikers = strikers
    })

    // striker has moved
    client.on(TYPES.EVENTS.ON_MOVE, data => {
      console.log('on moved', data)
      let {id, x, y} = data
      _.map(this.strikers, item => {
        if (item.id === id) return {...item, x, y}
        return item
      })

    })
  }

  run () {
    let now = Date.now();
    let duration = now - this.then
    this.update(duration / 1000)
    this.renderer.render(this.strikers)
    this.then = now
    requestAnimationFrame(() => this.run())
  }

  update (duration) {
    if (_.isNull(this.striker)) return
    if (38 in this.keysDown) {
      this.striker.y -= this.striker.speed * duration
      if (this.striker.y <= 0) this.striker.y = 0
    }
    if (40 in this.keysDown) {
      this.striker.y += this.striker.speed * duration
      if (this.striker.y >= this.renderer.canvas.height) this.striker.y = this.renderer.canvas.height
    }
    if (37 in this.keysDown) {
      this.striker.x -= this.striker.speed * duration
      if (this.striker.x <= 0) this.striker.x = 0
    }
    if (39 in this.keysDown) {
      this.striker.x += this.striker.speed * duration
      if (this.striker.x >= this.renderer.canvas.width) this.striker.x = this.renderer.canvas.width
    }
    console.log(this.striker.isMoving, 'isMoving')
    if (this.striker.isMoving) this.connecter.move(this.striker)
    this.striker.animation()
  }

  setImage (k, v) {
    this.imager[k] = v
  }
}