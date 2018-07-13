export class Renderer {
  constructor () {
    this.canvas = document.querySelector('#game')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = document.body.clientWidth
    this.canvas.height = document.body.clientHeight
  }

  render (striker) {
    this.clear()
    this.context.drawImage(striker.img, striker.x, striker.y)
  }

  clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}