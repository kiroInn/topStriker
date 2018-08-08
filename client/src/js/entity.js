export class Entity {
  constructor (id, type) {
    // base
    this.id = id
    this.type = type

    // coordinates
    this.x = -1
    this.y = -1

    // renderer
    this.sprite = null
    this.animations = null
  }

  setPosition (x, y) {
    this.x = x
    this.y = y
  }

  setSprite (sprite) {
    if (!sprite) {
      console.error('sprite is null')
      throw "ERROR"
    }
    this.sprite = sprite
  }
}