export class Renderer {
  constructor () {
    this.canvas = document.querySelector('#game')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = document.body.clientWidth
    this.canvas.height = document.body.clientHeight
  }

  render (striker) {
    this.clear()
    this.drawStriker(striker)
  }

  drawStriker (striker) {
    let ctx = this.context
    ctx.drawImage(striker.img, striker.x, striker.y)
    this.drawText(striker.name, (striker.x + 15), (striker.y + striker.nameOffsetY), true, "#fcda5c", "#fcda5c")
  }

  drawText (text, x, y, centered, color, strokeColor) {
    let ctx = this.context
    if (text && x && y) {
      ctx.save()
      if (centered) {
        ctx.textAlign = "center"
      }
      ctx.strokeStyle = strokeColor || "#373737"
      ctx.lineWidth = 1
      ctx.strokeText(text, x, y)
      ctx.fillStyle = color || "white"
      ctx.fillText(text, x, y)
      ctx.restore()
    }
  }

  clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}