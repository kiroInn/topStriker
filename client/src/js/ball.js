import {Entity} from './entity'
import {Sprite} from './sprite'
import {IMAGER} from './const'

export class Ball extends Entity {
  constructor ({id, x, y}) {
    super(id, x, y)
    this.cellIndex = 0
    this.setSprite(new Sprite(IMAGER.BALL))
  }

}