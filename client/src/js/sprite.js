export class Sprite {
  constructor (name) {
    this.name = name
    this.top = 0
    this.left = 0
    this.width = 0
    this.height = 0
    this.cellIndex = 0
    this.cells = []
    this.load()
  }

  load () {
    import(`../sprites/${this.name}.json`)
    .then((value) => {
      const {id, width, height, animations} = value
      import(`../img/common/${id}.png`).then(data => {
        this.filepath = data.default
        this.width = width
        this.height = height
        this.image = new Image()
        this.image.src = this.filepath
        this.image.onload = () => console.log('image is load')
        this.cells = animations
      })
    })
  }

  advance () {
    this.cellIndex === this.cells.length - 1 ? this.cellIndex = 0 : this.cellIndex++
  }

  getCurrentCell () {
    return this.cells[this.cellIndex]
  }
}