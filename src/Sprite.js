import { Vector2 } from "./Vector2";


export class Sprite {

  constructor({
    resource,
    frameSize, // size of the portion of the image that we want to pull
    hFrames, // sprite sheet rows
    vFrames, // sprite sheet cols
    frame, // which frame
    scale, // scale of the image to draw on canvas
    position, // where on canvas to draw image
    animations
  }){
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16,16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.scale = scale ?? 1;
    this.position = position;
    this.frameMap = new Map();
    this.animations = animations ?? null

    this.buildFrameMap()
  }

  step(delta){
    if(!this.animations) return

    this.animations.step(delta)
    this.frame = this.animations.frame
  }


  buildFrameMap(){
    let frameCount = 0

    // Navigate accross the sprite sheet grid one row at a time
    for(let v=0; v < this.vFrames; v++){
      for(let h=0; h < this.hFrames; h++){
        // save each frame into the frameMap as a numbered frame key, with the starting top left point to draw from as the value
        this.frameMap.set(
          frameCount,
          new Vector2(h * this.frameSize.x, v * this.frameSize.y)
        )
        frameCount ++
      }
    }
  }

  drawImage(ctx, x, y){
    if(!this.resource.isLoaded){
      return
    }

    // find the correct sprite to use
    let frameCoordX = 0
    let frameCoordY = 0

    const frame = this.frameMap.get(this.frame)

    if(frame){
      frameCoordX = frame.x
      frameCoordY = frame.y
    }

    ctx.drawImage(
      this.resource.image,
      frameCoordX, // starting point on image to pull pixels (X)
      frameCoordY, // starting point on image to pull pixels (Y)
      this.frameSize.x, // How big of an image to take from the sprite sheet (X)
      this.frameSize.y, // How big of an image to take from the sprite sheet (Y)
      x, //Where to place this on canvas tag X (0)
      y, //Where to place this on canvas tag Y (0)
      this.frameSize.x * this.scale, //How large to scale it (X)
      this.frameSize.y * this.scale, //How large to scale it (Y)
    )
  }

}