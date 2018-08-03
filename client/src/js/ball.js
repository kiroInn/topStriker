import {Entity} from './entity'
import {Sprite} from './sprite'
import {IMAGER} from './const'
import * as TYPES from '../../../shared/message'

const DISTANCE = 500

export class Ball extends Entity {
  constructor ({id, x, y}) {
    super(id, TYPES.ENTITIES.BALL)
    this.setPosition(x, y)
    this.cellIndex = 0
    this.kickDistance = 0
    this.speed = 1
    this.moveSpeed = 0
    this.status = TYPES.STATUS.BALL.IDLE
    this.lastTime = new Date()
    this.setSprite(new Sprite(IMAGER.BALL))
  }

  kick (angle) {
    if (this.status === TYPES.STATUS.BALL.DRIBBLED) {
      this.status = TYPES.STATUS.BALL.FLIGHT
      this.moveSpeed = 0
      this.kickDistance = DISTANCE
      this.kickAngle = angle
    }
  }

  canMove () {
    return this.kickDistance > 0
  }

  move () {
    if (this.canMove()) {
      if (this.kickDistance > DISTANCE / 2) {
        this.moveSpeed += this.speed
        this.x += this.moveSpeed
        this.kickDistance -= this.moveSpeed
      } else {
        this.moveSpeed -= this.speed
        if (this.moveSpeed < 0) this.moveSpeed = 1
        this.x += this.moveSpeed
        this.kickDistance -= this.moveSpeed
      }
    }
  }
}