export class Entity {
  constructor (id, type) {
    this.id = id
    this.type = type

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