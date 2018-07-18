export class Renderer {
  constructor () {
    this.canvas = document.querySelector('#game')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = document.body.clientWidth
    this.canvas.height = document.body.clientHeight
    this.lastTime = 0

  }

  render (striker) {
    this.clear()
    this.drawBackground()
    this.drawStriker(striker)
    this.drawFps()
  }

  drawBackground () {

  }

  drawStriker (striker) {
    if (striker.sprite.cells.length <= 0) return false
    let cell = striker.sprite.cells[striker.cellIndex]
    this.drawImage(striker.sprite.image, cell.left, cell.top, cell.width, cell.height, striker.x, striker.y, cell.width / 3, cell.height / 3)
    this.drawText(striker.name, (striker.x + striker.nameOffsetX), (striker.y + striker.nameOffsetY), true, "#fcda5c", "#fcda5c")
  }

  clipStriker (striker) {
    let ctx = this.context
    ctx.save()
    ctx.beginPath()
    ctx.arc(striker.x, striker.y, striker.width / 2, 0, Math.PI * 2, false)
    ctx.clip()
    ctx.restore()
  }

  drawImage (image, sx, sy, sw, sh, dx, dy, dw, dh) {
    this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
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

  drawArcs () {
    let ctx = this.context
    ctx.beginPath()
    ctx.arc(150, 100, 60, 0, Math.PI * 1.5)
    // ctx.closePath()
    ctx.stroke()
  }

  drawLine () {
    let ctx = this.context
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, this.canvas.clientWidth)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(0, 0, 100, 100, 200, 200)
    ctx.stroke()
  }

  drawFps () {
    let now = (+new Date())
    let fps = 1000 / (now - this.lastTime)
    this.lastTime = now
    this.context.fillStyle = 'cornflowerblue'
    this.context.textAlign = 'end'
    this.context.fillText(fps.toFixed() + ' fps', this.canvas.clientWidth, 10)
  }

  clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}