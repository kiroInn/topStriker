import {Striker} from './striker'
import {Renderer} from './renderer'
import {requestAnimationFrame} from './util'
import {Sprite} from './sprite'

export class Game {
  constructor () {
    this.keysDown = {}
    this.renderer = new Renderer(this)
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

  setUp ({id, name}) {
    this.striker = new Striker({id, name})
    this.striker.setSprite(new Sprite('nyan'))
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

}