import {Entity} from './entity'
import {Sprite} from './sprite'
import {IMAGE_MANAGER} from './const'
import * as TYPES from '../../../shared/message'
import {Map} from './map'

const ANIMATION_INTERVAL = 120
const ANIMATION_INTERVAL_EX = 20

export class Striker extends Entity {
  constructor ({id, name, x, y}) {
    super(id, TYPES.ENTITIES.STRIKER)
    this.name = name
    this.nameOffsetY = 0
    this.nameOffsetX = 15
    this.speed = 128
    this.status = TYPES.STATUS.STRIKER.IDLE
    this.orientation = TYPES.ORIENTATIONS.RIGHT
    this.lastTime = new Date()
    this.setPosition(x, y)
    this.setSprite(new Sprite(IMAGE_MANAGER.NYAN))
  }

  animation () {
    let nowTime = new Date()
    let diffTime = nowTime.getTime() - this.lastTime.getTime()
    if (this.status === TYPES.STATUS.STRIKER.RUNNING && diffTime >= ANIMATION_INTERVAL_EX) {
      this.sprite.advance()
      this.lastTime = nowTime
    } else if (diffTime >= ANIMATION_INTERVAL) {
      this.sprite.advance()
      this.lastTime = nowTime
    }
    this.sprite.setFlipX(this.orientation === TYPES.ORIENTATIONS.LEFT)
  }

  canDribbling (ball) {
    const {status, x, y, sprite} = ball
    if (status === TYPES.STATUS.BALL.IDLE) {
      let isOnRight = this.x + Map.getAbsoluteWidth(this.sprite.width) >= x &&
        this.x <= x &&
        this.y <= y &&
        this.y + Map.getAbsoluteWidth(this.sprite.height) >= y
      let isOnLeft = this.x <= x + Map.getAbsoluteWidth(sprite.width) &&
        this.x + Map.getAbsoluteWidth(this.sprite.width) >= x + Map.getAbsoluteWidth(sprite.width) &&
        y + Map.getAbsoluteWidth(sprite.height) >= this.y &&
        y + Map.getAbsoluteWidth(sprite.height) <= this.y + Map.getAbsoluteWidth(this.sprite.height)
      return isOnLeft || isOnRight
    }
    return status === TYPES.STATUS.BALL.DRIBBLED
  }

}