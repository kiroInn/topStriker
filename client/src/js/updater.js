import _ from 'lodash'
import * as TYPES from '../../../shared/message'
import {CLIENT_HEIGHT, CLIENT_WIDTH, Map} from './map'

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
    if (38 in this.game.keysDown) {
      striker.y -= striker.speed * duration
      if (striker.y <= 0) striker.y = 0
      isMoving = true
    }
    if (40 in this.game.keysDown) {
      striker.y += striker.speed * duration
      if (striker.y + Map.getAbsoluteHeight(striker.sprite.height) >= CLIENT_HEIGHT) striker.y = CLIENT_HEIGHT - Map.getAbsoluteHeight(striker.sprite.height)
      isMoving = true
    }
    if (37 in this.game.keysDown) {
      striker.x -= striker.speed * duration
      if (striker.x <= 0) striker.x = 0
      isMoving = true
    }
    if (39 in this.game.keysDown) {
      striker.x += striker.speed * duration
      if (striker.x + Map.getAbsoluteWidth(striker.sprite.width) >= CLIENT_WIDTH) striker.x = CLIENT_WIDTH - Map.getAbsoluteWidth(striker.sprite.width)
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
      if (this.game.canDribbling()) {
        this.game.ball.x = striker.x + 30
        this.game.ball.y = striker.y
        this.game.connecter.move(this.game.ball)
        this.game.ball.status = TYPES.STATUS.BALL.DRIBBLED
      }
    }
  }


  updateBall () {
    let ball = this.
    if (_.invoke(this.game.ball, 'canMove')) {
      this.game.ball.move()
      if (this.game.ball.x + Map.getAbsoluteWidth(strike.sprite.width) >= CLIENT_WIDTH) this.game.ball.x = CLIENT_WIDTH - 64
      this.game.connecter.move(this.game.ball)
    }
  }
}