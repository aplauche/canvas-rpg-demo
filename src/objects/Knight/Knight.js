import { GameObject } from "../../GameObject";
import { resources } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Knight extends GameObject {
  constructor(x,y){
    super({
      position: new Vector2(x,y)
    })

    this.isSolid = true

    this.shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32,32),
      position: new Vector2(-8,-18),
     })

    this.addChild(this.shadow)

    this.body = new Sprite({
      resource: resources.images.knight,
      frameSize: new Vector2(32, 32),
      hFrames: 2,
      vFrames: 1,
      position: new Vector2(-8,-20)
    })

    this.addChild(this.body)
  }
}