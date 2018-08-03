import {FIELD_NUMBER} from './const'

export class Map {
  constructor () {
  }

  static getRelativePosition (x, y) {
    return {
      rx: FIELD_NUMBER.WIDTH * x / CLIENT_WIDTH,
      ry: FIELD_NUMBER.HEIGHT * y / CLIENT_HEIGHT
    }
  }

  static getAbsolutePosition (rx, ry) {
    return {
      x: rx * CLIENT_WIDTH / FIELD_NUMBER.WIDTH,
      y: ry * CLIENT_HEIGHT / FIELD_NUMBER.HEIGHT
    }
  }
}

export const CLIENT_WIDTH = document.body.clientWidth
export const CLIENT_HEIGHT = document.body.clientHeight