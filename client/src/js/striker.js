import {Entity} from './entity'
import {Sprite} from './sprite'
import {IMAGE_MANAGER} from './const'
import * as TYPES from '../../../shared/message'

const ANIMATION_INTERVAL = 120
const ANIMATION_INTERVAL_EX = 20

export class Striker extends Entity {
  constructor ({id, name, x, y}) {
    super(id, TYPES.ENTITIES.STRIKER)
    this.setPosition(x, y)
    this.name = name
    this.nameOffsetY = 0
    this.nameOffsetX = 15
    this.speed = 128
    this.status = TYPES.STATUS.STRIKER.IDLE
    this.lastTime = new Date()
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
  }



  dribbling () {
  }

}