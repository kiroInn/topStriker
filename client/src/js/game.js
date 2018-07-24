import _ from 'lodash'
import {Striker} from './striker'
import {Renderer} from './renderer'
import {requestAnimationFrame} from './util'
import {Sprite} from './sprite'
import {Connect} from './connect'
import {TYPES} from './const'

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
      this.striker.isMoveing = true
    }, false)

    window.addEventListener('keyup', (e) => {
      delete this.keysDown[e.keyCode]
      this.striker.isMoveing = false
    }, false)
  }

  setStriker ({id, name}) {
    let striker = new Striker({id, name})
    striker.setSprite(new Sprite('nyan'))
    return striker
  }

  connect (striker) {
    this.connecter = new Connect()
    this.connecter.connect(striker)
    this.receive(this.connecter.socket)
  }

  receive (listener) {
    listener.on(TYPES.EVENTS.ON_INIT, data => {
      _.each(values, value => {
        let striker = this.setStriker(value)
        if (_.get(value, 'uuid') === striker.uuid) this.striker = striker
        this.strikers.push(striker)
      })
      this.run()
    })
    listener.on(TYPES.EVENTS.ON_MOVE, data => {
      console.log(TYPES.EVENTS.ON_MOVE)
    })
  }

  run () {
    let now = Date.now();
    let duration = now - this.then
    this.update(duration / 1000)
    this.renderer.render(this.striker)
    this.then = now
    requestAnimationFrame(() => this.run())
  }

  update (duration) {
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
    this.striker.animation()
  }

  setImage (k, v) {
    this.imager[k] = v
  }
}