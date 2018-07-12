import {Striker} from './striker'

export class Game{
  constructor (){
    this.canvas = document.querySelector('#game')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = document.body.clientWidth
    this.canvas.height = document.body.clientHeight
  }

  setUp ({id, name}) {
    this.striker = new Striker({id, name})
  }

  run (){
    this.interval = setInterval(() => this.update(), 10);
  }

  update(){
    this.clear()
    this.context.fillStyle = 'deeppink'
    this.context.fillRect(this.striker.x,this.striker.y, 30, 30)
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}