export class GameLoop {
  constructor(update, render){

    this.lastFrameTime = 0
    this.accumulatedTime = 0
    this.timeStep = 1000 / 60 // 60fps

    this.update = update
    this.render = render

    this.rafId = null
    this.isRunning = false
  }

  mainLoop = (timeStamp) => {

    if(!this.isRunning) return

    let deltaTime = timeStamp - this.lastFrameTime
    this.lastFrameTime = timeStamp

    this.accumulatedTime += deltaTime

    // if enough time has passed go ahead to next frame
    // this syncs timing even if computer is running at 120fps
    while (this.accumulatedTime >= this.timeStep){
      this.update(this.timeStep)
      this.accumulatedTime -= this.timeStep
    }

    // Update only happens once per 1/60th of second, but render happens however often the refresh happens
    this.render()
    this.rafId = requestAnimationFrame(this.mainLoop)
  }

  start(){
    if(!this.isRunning){
      this.isRunning = true
      this.rafId = requestAnimationFrame(this.mainLoop)
    }
  }

  stop(){
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}