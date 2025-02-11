export const UP = "UP"
export const DOWN = "DOWN"
export const LEFT = "LEFT"
export const RIGHT = "RIGHT"

// This custom implementaion allows a multikey input where the last pressed key is the one that counts
export class Input {

  constructor(){

    this.heldDirections = []

    document.addEventListener('keydown', e => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onArrowPressed(UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onArrowPressed(DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onArrowPressed(LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onArrowPressed(RIGHT);
      }
    })
    document.addEventListener('keyup', e => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onArrowReleased(UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onArrowReleased(DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onArrowReleased(LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onArrowReleased(RIGHT);
      }
    })
  }

  get direction(){
    return this.heldDirections[0]
  }

  onArrowPressed(direction){
    // Add this arrow to the queue if it's new
    if (this.heldDirections.indexOf(direction) === -1) {
      this.heldDirections.unshift(direction);
    }
  }

  onArrowReleased(direction){
    const index = this.heldDirections.indexOf(direction);
    if (index === -1) {
      return;
    }
    // Remove this key from the list
    this.heldDirections.splice(index, 1);
  }

}