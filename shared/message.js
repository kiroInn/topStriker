const TYPES = {
  EVENTS: {
    INITIAL: 0,
    INITIALED: 1,
    MOVE: 2,
    MOVED: 3
  },
  ENTITY: {
    STRIKER: 0,
    BALL: 1
  },
  STATUS: {
    BALL: {
      IDLE: 0,
      DRIBBLED: 1,
      FLIGHT: 2
    },
    STRIKER: {
      IDLE: 0,
      RUNNING: 1
    }
  }
}

if (!(typeof exports === 'undefined')) {
  module.exports = TYPES
}
