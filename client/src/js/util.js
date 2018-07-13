export class Util {
  static guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return `${s4() + s4() + s4() + s4()}`
  }

  static gRequestAnimationFrame() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;
  }
}