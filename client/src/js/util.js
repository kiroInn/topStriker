export class Util {
  static guid () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return `${s4() + s4() + s4() + s4()}`
  }
}

export const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback, element) {
  let self = this, start, finish
  window.setTimeout(() => {
    start = +new Date()
    callback(start)
    finish = +new Date()
    self.timeout = 1000 / 60 - (finish - start)
  }, self.timeout)
}
