import { events } from "./Events";
import { GameObject } from "./GameObject";
import { canvasDimensions } from "./main";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {

  constructor(){
    super();

    events.on("HERO_POSITION_CHANGED", this, (heroPosition) => {
      this.snapCameraToPosition(heroPosition)
    })

    // camera listens for level changes to snap to the new start to avoid flash of wrong frame
    events.on("CHANGE_LEVEL", this, newLevel => {
      this.snapCameraToPosition(newLevel.heroStart)
    })

  }

  snapCameraToPosition(pos){
    // we want to center the person on screen
    const personHalfWidth = 8
    const canvasWidth = canvasDimensions.x
    const canvasHeight = canvasDimensions.y

    const halfWidth = -personHalfWidth + canvasWidth / 2
    const halfHeight = -personHalfWidth + canvasHeight / 2

    this.position = new Vector2(
      -pos.x + halfWidth,
      -pos.y + halfHeight
    )
  }


}