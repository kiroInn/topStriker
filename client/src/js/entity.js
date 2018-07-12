export class Entity {
  constructor (id){
    this.id = id
    this.x = 0
    this.y = 0
  }

  setPosition (x,y) {
    this.x = x
    this.y = y
  }
}