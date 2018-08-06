export class Map {
  constructor () {
  }

  static getRelativePosition (x, y) {
    return {
      rx: GAME_WIDTH * x / CLIENT_WIDTH,
      ry: GAME_HEIGHT * y / CLIENT_HEIGHT
    }
  }

  static getAbsolutePosition (rx, ry) {
    return {
      x: rx * CLIENT_WIDTH / GAME_WIDTH,
      y: ry * CLIENT_HEIGHT / GAME_HEIGHT
    }
  }

  static getAbsoluteWidth (value) {
    return value * CLIENT_WIDTH / GAME_WIDTH
  }

  static getRelativeWidth (value) {
    return value * GAME_WIDTH / CLIENT_WIDTH
  }

  static getAbsoluteHeight (value) {
    return value * CLIENT_HEIGHT / GAME_HEIGHT
  }

  static getRelativeHeight (value) {
    return value * GAME_HEIGHT / CLIENT_HEIGHT
  }
}

export const CLIENT_WIDTH = document.body.clientWidth
export const CLIENT_HEIGHT = document.body.clientHeight
export const GAME_WIDTH = 736
export const GAME_HEIGHT = 414