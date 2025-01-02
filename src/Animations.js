export class Animations {
  // Receives an object with keys as animation names and values as FrameIndexPattern instances or "tracks"
  // This class is used as a switcher to select and play different animation tracks passing the delta time
  constructor(patterns){
    this.patterns = patterns
    this.activeKey = Object.keys(this.patterns)[0]
  }

  get frame(){
    return this.patterns[this.activeKey].frame
  }

  step(delta){
    this.patterns[this.activeKey].step(delta)
  }

  play(key, startAt = 0){
    if(this.activeKey === key) return;
    this.activeKey = key
    this.patterns[this.activeKey].currentTime = startAt
  }


}