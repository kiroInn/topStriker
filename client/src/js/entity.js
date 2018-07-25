export class Entity {
  constructor (id, x = 0, y = 0) {
    this.id = id
    this.x = x
    this.y = y

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