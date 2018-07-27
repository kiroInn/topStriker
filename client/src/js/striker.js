import {Entity} from './entity'
import {Sprite} from './sprite'
import {IMAGER} from './const'

const ANIMATION_INTERVAL = 100
const ANIMATION_INTERVAL_EX = 20

export class Striker extends Entity {
  constructor ({id, name, x, y}) {
    super(id, x, y)
    this.name = name
    this.nameOffsetY = 0
    this.nameOffsetX = 15
    this.speed = 128
    this.isMoving = false
    this.lastTime = new Date()
    this.setSprite(new Sprite(IMAGER.NYAN))
  }

  animation () {
    let nowTime = new Date()
    let diffTime = nowTime.getTime() - this.lastTime.getTime()
    if (this.isMoving && diffTime >= ANIMATION_INTERVAL_EX) {
      this.sprite.advance()
      this.lastTime = nowTime
    } else if (diffTime >= ANIMATION_INTERVAL) {
      this.sprite.advance()
      this.lastTime = nowTime
    }
  }

}