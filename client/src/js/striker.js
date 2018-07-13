import {Entity} from './entity'
import heroImg from '../img/common/hero.png'

export class Striker extends Entity {
  constructor ({id, name}) {
    super(id)
    this.name = name
    this.nameOffsetY = -5
    this.speed = 256
    this.img = new Image()
    this.img.src = heroImg
  }

  setSpriteName (name) {
    this.spriteName = name
  }

  getSpriteName () {
    return this.spriteName
  }
}