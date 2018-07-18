export class Entity {
  constructor (id) {
    this.id = id
    this.x = 0
    this.y = 0

    // renderer
    this.sprite = null
    this.animations = null
  }

  setPosition (x, y) {
    this.x = x
    this.y = y
  }

  setSprite (sprite) {
    if(!sprite) {
      console.error('sprite is null')
      throw "ERROR"
    }
    this.sprite = sprite
  }
}