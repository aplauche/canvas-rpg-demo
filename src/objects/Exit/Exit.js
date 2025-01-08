import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";


export class Exit extends GameObject {
  constructor(x,y){
    super({
      position: new Vector2(x,y)
    })

    this.addChild(new Sprite({
      resource: resources.images.exit,
    }))

    
  
  }

  onCollideWithHero(){
    events.emit("HERO_EXITED")
  }

  ready(){
    events.on("HERO_POSITION_CHANGED", this, (heroPosition) => {
      const roundedX = Math.round(heroPosition.x)
      const roundedY = Math.round(heroPosition.y)

      if(roundedX === this.position.x && roundedY === this.position.y){
        this.onCollideWithHero()
      }
    })
  }
}