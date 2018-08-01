import {Entity} from './entity'
import {Sprite} from './sprite'
import {IMAGER} from './const'

const DISTANCE = 500

export class Ball extends Entity {
  constructor ({id, x, y}) {
    super(id, x, y)
    this.cellIndex = 0
    this.kickDistance = 0
    this.speed = 1
    this.moveSpeed = 0
    this.lastTime = new Date()
    this.setSprite(new Sprite(IMAGER.BALL))
  }

  kick (angle) {
    this.moveSpeed = 0
    this.kickDistance = DISTANCE
    this.kickAngle = angle
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
        if (this.moveSpeed < 0) this.moveSpeed = 0
        this.x += this.moveSpeed
        this.kickDistance -= this.moveSpeed
      }
    }
  }
}