import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Inventory extends GameObject {
  constructor(){
    super({
      position: new Vector2(0,2) //schooch it down a bit
    })

    this.drawLayer = "HUD"

    this.items = []

    events.on("ITEM_PICKUP", this, (data) => {
      // TODO: use real unique identifiers by adding prop to GameObject
      this.items.push({
        id: this.items.length,
        image: data.image,
      })
      this.renderInventory()
    })

    this.renderInventory()

    // for testing removal of item after 4 seconds
    // setTimeout(() => {
    //   this.removeItemFromInventory(0)
    // }, 4000);
  }

  removeItemFromInventory(id){
    this.items = this.items.filter(item => item.id !== id)
    this.renderInventory()
  }

  renderInventory(){

    // clear the inventory of old images
    this.children.forEach(child => {
      child.destroy()
    })

    // render the inventory
    this.items.forEach((item, index) => {
      const sprite = new Sprite({
        resource: item.image,
        position: new Vector2(index * 12, 0),
      })
  
      this.addChild(sprite)
    })
  }
}