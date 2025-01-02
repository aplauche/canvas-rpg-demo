export class FrameIndexPattern {
  // this class receives an object with frames / duration and acts as an animation "track" 
  // this can be selected and played through by the Animation class player
  constructor(animationConfig){
    this.currentTime = 0
    this.animationConfig = animationConfig
    this.duration = animationConfig.duration ?? 500
  }

  step(delta){
    this.currentTime += delta

    if(this.currentTime >= this.duration){
      this.currentTime = 0
    }
  }

  get frame(){
    const {frames} = this.animationConfig
    // loop backwards through frames until we find the current frame based on time
    for(let i = frames.length - 1; i >= 0; i--){
      if(this.currentTime >= frames[i].time){
        return frames[i].frame
      }
    }
  }
}