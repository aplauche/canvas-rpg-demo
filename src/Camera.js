import { events } from "./Events";
import { GameObject } from "./GameObject";
import { canvasDimensions } from "./main";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {

  constructor(){
    super();

    events.on("HERO_POSITION_CHANGED", this, (heroPosition) => {

      // we want to center the person on screen
      const personHalfWidth = 8
      const canvasWidth = canvasDimensions.x
      const canvasHeight = canvasDimensions.y

      const halfWidth = -personHalfWidth + canvasWidth / 2
      const halfHeight = -personHalfWidth + canvasHeight / 2

      this.position = new Vector2(
        -heroPosition.x + halfWidth,
        -heroPosition.y + halfHeight
      )

      console.log('camera position', this.position)
    })

  }


}