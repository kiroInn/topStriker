import _ from 'lodash'
import * as TYPES from '../../../shared/message'
import {CLIENT_HEIGHT, CLIENT_WIDTH, Map} from './map'
import {KEY_MAP} from './const';

export class Updater {
  constructor (game) {
    this.game = game
    this.then = new Date()
  }

  update () {
    let now = Date.now();
    let duration = now - this.then
    this.updateEntity(duration / 1000)
    this.updateBall()
    this.then = now
  }

  updateEntity (duration) {
    let striker = this.game.striker
    if (_.isNull(striker)) return
    let isMoving = false
    if (KEY_MAP.UP in this.game.keysDown) {
      striker.y -= striker.speed * duration
      if (striker.y <= 0) striker.y = 0
      isMoving = true

    }
    if (KEY_MAP.DOWN in this.game.keysDown) {
      striker.y += striker.speed * duration
      if (striker.y + Map.getAbsoluteHeight(striker.sprite.height) >= CLIENT_HEIGHT) striker.y = CLIENT_HEIGHT - Map.getAbsoluteHeight(striker.sprite.height)
      isMoving = true
    }
    if (KEY_MAP.LEFT in this.game.keysDown) {
      striker.x -= striker.speed * duration
      if (striker.x <= 0) striker.x = 0
      striker.orientation = TYPES.ORIENTATIONS.LEFT
      isMoving = true
    }
    if (KEY_MAP.RIGHT in this.game.keysDown) {
      striker.x += striker.speed * duration
      if (striker.x + Map.getAbsoluteWidth(striker.sprite.width) >= CLIENT_WIDTH) striker.x = CLIENT_WIDTH - Map.getAbsoluteWidth(striker.sprite.width)
      striker.orientation = TYPES.ORIENTATIONS.RIGHT
      isMoving = true
    }
    if (isMoving) {
      _.each(this.game.strikers, item => {
        if (_.get(item, 'id') === striker.id) {
          item.x = striker.x
          item.y = striker.y
        }
      })
      this.game.connecter.move(striker)
      if (striker.canDribbling(this.game.ball)) {
        if (striker.orientation === TYPES.ORIENTATIONS.RIGHT) {
          this.game.ball.x = striker.x + Map.getAbsoluteWidth(striker.sprite.width)
          this.game.ball.y = striker.y + 10
        }
        if (striker.orientation === TYPES.ORIENTATIONS.LEFT) {
          this.game.ball.x = striker.x - Map.getAbsoluteWidth(this.game.ball.sprite.width)
          this.game.ball.y = striker.y + 10
        }
        this.game.connecter.move(this.game.ball)
        this.game.ball.status = TYPES.STATUS.BALL.DRIBBLED
      }
    }
  }

  updateBall () {
    let ball = this.game.ball
    if (_.invoke(ball, 'canMove')) {
      ball.move()
      if (ball.x <= 0) ball.x = 0
      if (ball.x + Map.getAbsoluteWidth(ball.sprite.width) >= CLIENT_WIDTH) ball.x = CLIENT_WIDTH - Map.getAbsoluteWidth(ball.sprite.width)
      this.game.connecter.move(ball)
    }
  }
}