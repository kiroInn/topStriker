import {Util} from './util'
import {DOM} from './dom'
import {Game} from './game'

export class App {
  constructor () {
    this.userContainer = document.querySelector('#user')
    this.userNameInput = document.querySelector('#user input')
    this.userNameBtn = document.querySelector('#user button')
    this.roomContainer = document.querySelector('#room')
    this.roomNumberInput = document.querySelector('#room input')
    this.roomNumberBtn = document.querySelector('#room button')
    this.game = new Game()
    this.init()
  }

  init () {
    DOM.hide(this.roomContainer)
    document.addEventListener('DOMContentLoaded', () => {
      this.userNameBtn.addEventListener('click', () => this.selectUser())
      this.roomNumberBtn.addEventListener('click', () => this.selectRoom())
    })
  }

  selectUser () {
    let userName = this.userNameInput.value
    if (!userName) {
      this.userNameInput.focus()
      return false
    }
    console.log({name: userName, uid: Util.guid()})
    DOM.hide(this.userContainer)
    DOM.show(this.roomContainer)
  }

  selectRoom () {
    let number = this.roomNumberInput.value
    if (!number) {
      this.roomNumberInput.focus()
      return false
    }
    console.log({number})
    DOM.hide(this.roomContainer)
    this.game.setUp({id: Util.guid(), name: 'Kiro'})
    this.game.run()
  }
}

new App()