import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Rod extends GameObject {
  constructor(x,y){
    super({position: new Vector2(x,y)})

    this.sprite = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0,-5), // bump up sprite a bit
    })


    events.on("HERO_POSITION_CHANGED", this, (heroPosition) => {

      // round the hero position to the nearest grid cell
      const roundedX = Math.round(heroPosition.x)
      const roundedY = Math.round(heroPosition.y)

      if(roundedX === this.position.x && roundedY === this.position.y){
        this.onCollideWithHero()
      }
    })

    this.addChild(this.sprite)
  }

  onCollideWithHero(){
    this.destroy() // calls the destroy method on the GameObject class removing everything
  }
  
}