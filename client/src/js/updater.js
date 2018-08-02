import _ from 'lodash'
import {FIELD_NUMBER} from './const'

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
      if (striker.y + this.game.renderer.canvas.height / FIELD_NUMBER.HEIGHT >= this.game.renderer.canvas.height) striker.y = this.game.renderer.canvas.height - this.game.renderer.canvas.height / FIELD_NUMBER.HEIGHT
      isMoving = true
    }
    if (37 in this.game.keysDown) {
      striker.x -= striker.speed * duration
      if (striker.x <= 0) striker.x = 0
      isMoving = true
    }
    if (39 in this.game.keysDown) {
      striker.x += striker.speed * duration
      if (striker.x + this.game.renderer.canvas.width / FIELD_NUMBER.WIDTH >= this.game.renderer.canvas.width) striker.x = this.game.renderer.canvas.width - this.game.renderer.canvas.width / FIELD_NUMBER.WIDTH
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
    }
  }

  updateBall () {
    if (_.invoke(this.game.ball, 'canMove')) {
      this.game.ball.move()
      if (this.game.ball.x + 64 >= this.game.renderer.canvas.width) this.game.ball.x = this.game.renderer.canvas.width - 64
      this.game.connecter.move(this.game.ball)
    }
  }
}