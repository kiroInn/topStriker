import _ from 'lodash'
import {Striker} from './striker'
import {Renderer} from './renderer'
import {requestAnimationFrame} from './util'
import {Sprite} from './sprite'
import {Connect} from './connect'

export class Game {
  constructor () {
    this.keysDown = {}
    this.imager = {}
    this.renderer = new Renderer(this)
    this.striker = null
    this.strikers = []
    this.connecter = null
    this.then = new Date()
    this.connecter = new Connect()
    window.addEventListener('keydown', e => {
      this.keysDown[e.keyCode] = true
      if (_.has(this.striker, 'isMoving')) this.striker.isMoving = true
    }, false)

    window.addEventListener('keyup', (e) => {
      delete this.keysDown[e.keyCode]
      if (_.has(this.striker, 'isMoving')) this.striker.isMoving = false
    }, false)
  }

  setCurrentStriker ({id, name}) {
    this.currentStriker = {id, name}
  }

  buildStriker ({id, name}) {
    let striker = new Striker({id, name})
    striker.setSprite(new Sprite('nyan'))
    return striker
  }

  connect () {
    this.connecter.connect()
    this.connecter.onConnect(() => {
      this.connecter.init(this.currentStriker)
      this.receiveData()
    })
    this.run()
  }

  receiveData () {
    this.connecter.onInit(values => {
      let strikers = []
      _.each(values, value => {
        let striker = this.buildStriker(value)
        if (_.get(value, 'id') === this.currentStriker.id) this.striker = striker
        strikers.push(striker)
      })
      this.strikers = strikers
    })

    this.connecter.onMove(data => {
      let {id, x, y} = data
      _.each(this.strikers, item => {
        if (item.id === id) {
          item.x = x
          item.y = y
        }
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
      this.connecter.move(this.striker)
    }
    if (40 in this.keysDown) {
      this.striker.y += this.striker.speed * duration
      if (this.striker.y >= this.renderer.canvas.height) this.striker.y = this.renderer.canvas.height
      this.connecter.move(this.striker)
    }
    if (37 in this.keysDown) {
      this.striker.x -= this.striker.speed * duration
      if (this.striker.x <= 0) this.striker.x = 0
      this.connecter.move(this.striker)
    }
    if (39 in this.keysDown) {
      this.striker.x += this.striker.speed * duration
      if (this.striker.x >= this.renderer.canvas.width) this.striker.x = this.renderer.canvas.width
      this.connecter.move(this.striker)
    }
  }

  setImage (k, v) {
    this.imager[k] = v
  }
}