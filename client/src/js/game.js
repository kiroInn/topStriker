import _ from 'lodash'
import {Striker} from './striker'
import {Renderer} from './renderer'
import {requestAnimationFrame, Util} from './util'
import {Connect} from './connect'
import {Ball} from './ball'
import {Updater} from './updater'

export class Game {
  constructor () {
    this.keysDown = {}
    this.imager = {}
    this.renderer = new Renderer(this)
    this.striker = null
    this.strikers = []
    this.ball = {}
    this.connecter = null
    this.connecter = new Connect()
    this.updater = new Updater(this)
    window.addEventListener('keydown', e => {
      this.keysDown[e.keyCode] = true
      if (_.has(this.striker, 'isMoving')) this.striker.isMoving = true
      if (e.keyCode === 65) this.ball.kick()
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
      this.tick()
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

  tick () {
    this.updater.update()
    this.renderer.render(this.strikers)
    requestAnimationFrame(() => this.tick())
  }

  setImage (k, v) {
    this.imager[k] = v
  }
}