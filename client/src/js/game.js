import _ from 'lodash'
import {Striker} from './striker'
import {Renderer} from './renderer'
import {requestAnimationFrame, Util} from './util'
import {Connect} from './connect'
import {Ball} from './ball'

export class Game {
  constructor () {
    this.keysDown = {}
    this.imager = {}
    this.renderer = new Renderer(this)
    this.striker = null
    this.strikers = []
    this.ball = {}
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

  connect () {
    this.connecter.connect()
    this.connecter.onConnect(() => {
      this.connecter.init(this.currentStriker)
      this.receiveData()
    })
    this.run()
  }

  receiveData () {
    this.connecter.onInit(({strikers, ball}) => {
      let values = []
      _.each(strikers, value => {
        let striker = new Striker(value)
        if (_.get(value, 'id') === this.currentStriker.id) this.striker = striker
        values.push(striker)
      })
      this.strikers = values
      this.ball = new Ball({...ball, id: Util.guid()})
    })

    this.connecter.onMove(data => {
      let {id, x, y} = data
      if (id === this.striker.id) return true
      _.each(this.strikers, item => {
        if (item.id === id) {
          item.isMoving = true
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
    _.each(this.strikers, item => {
      if (_.get(item, 'id') === this.striker.id) {
        item.x = this.striker.x
        item.y = this.striker.y
      }
    })
  }

  setImage (k, v) {
    this.imager[k] = v
  }
}