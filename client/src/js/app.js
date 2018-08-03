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
    this.game = null
    this.init()
  }

  init () {
    DOM.hide(this.roomContainer)
    this.initListener()
  }

  selectUser () {
    let userName = this.userNameInput.value
    if (!userName) {
      this.userNameInput.focus()
      return false
    }
    DOM.hide(this.userContainer)
    this.game = new Game()
    this.game.loadAssets().then(() => {
      this.game.setPlayer({id: Util.guid(), name: userName})
      this.game.run()
    })
  }

  selectRoom () {
    let number = this.roomNumberInput.value
    if (!number) {
      this.roomNumberInput.focus()
      return false
    }
    DOM.hide(this.roomContainer)
  }

  initListener () {
    document.addEventListener('DOMContentLoaded', () => {
      this.userNameBtn.addEventListener('click', () => this.selectUser())
      this.roomNumberBtn.addEventListener('click', () => this.selectRoom())
    })
    window.matchMedia('(orientation:portrait)').addListener(function () {
      location.reload()
    })
  }
}

new App()