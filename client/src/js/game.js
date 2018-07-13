import {Striker} from './striker'
import {Renderer} from './renderer'
import {requestAnimationFrame} from './util'

export class Game {
  constructor () {
    this.keysDown = {}
    this.renderer = new Renderer()
    this.then = new Date()
    window.addEventListener('keydown', e => {
      this.keysDown[e.keyCode] = true
    }, false)

    window.addEventListener('keyup', (e) => {
      delete this.keysDown[e.keyCode]
    }, false)
  }

  setUp ({id, name}) {
    this.striker = new Striker({id, name})
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
    }
    if (40 in this.keysDown) {
      this.striker.y += this.striker.speed * duration
    }
    if (37 in this.keysDown) {
      this.striker.x -= this.striker.speed * duration
    }
    if (39 in this.keysDown) {
      this.striker.x += this.striker.speed * duration
    }
  }

}