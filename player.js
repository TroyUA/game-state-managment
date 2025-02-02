import {
  FallingLeft,
  FallingRight,
  JumpingLeft,
  JumpingRight,
  RunningLeft,
  RunningRight,
  SitingLeft,
  SitingRight,
  StandingLeft,
  StandingRight,
} from './state.js'

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight
    this.gameWidth = gameWidth
    this.states = [
      new StandingLeft(this),
      new StandingRight(this),
      new SitingLeft(this),
      new SitingRight(this),
      new RunningLeft(this),
      new RunningRight(this),
      new JumpingLeft(this),
      new JumpingRight(this),
      new FallingLeft(this),
      new FallingRight(this),
    ]
    this.currentState = this.states[1]
    this.image = document.getElementById('dogImage')
    this.width = 200
    this.height = 181.83
    this.x = this.gameWidth / 2 - this.width / 2
    this.y = this.gameHeight - this.height
    this.velocityY = 0
    this.weight = 1
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 6
    this.speed = 0
    this.maxSpeed = 10

    this.fps = 30
    this.frameTimer = 0
    this.frameInterval = 1000 / this.fps
  }

  draw(context, deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }

    context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  update(input) {
    this.currentState.handleInput(input)
    // horizontal movement
    this.x += this.speed
    if (this.x <= 0) this.x = 0
    else if (this.x >= this.gameWidth - this.width)
      this.x = this.gameWidth - this.width
    // vertical movement
    this.y += this.velocityY
    if (!this.onGround) {
      this.velocityY += this.weight
    } else {
      this.velocityY = 0
    }
  }

  setState(state) {
    this.currentState = this.states[state]
    this.currentState.enter()
  }

  get onGround() {
    return this.y >= this.gameHeight - this.height
  }
}
