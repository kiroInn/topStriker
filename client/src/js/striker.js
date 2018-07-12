import {Entity} from './entity'

export class Striker extends Entity{
  constructor ({id, name}){
    super(id)
    this.name = name
  }
}