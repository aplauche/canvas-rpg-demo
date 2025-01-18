import { Camera } from "../../Camera"
import { events } from "../../Events"
import { GameObject } from "../../GameObject"
import { Input } from "../../Input"
import { Inventory } from "../Inventory/Inventory"
import { TextBox } from "../TextBox/TextBox"

export class Main extends GameObject {
  constructor(){ 
    super({})
    
    this.level = null
    this.input = new Input()
    this.camera = new Camera()
    this.inventory = new Inventory()
    this.textBox = new TextBox()
  }

  ready(){
    events.on('CHANGE_LEVEL', this, newLevel => {
      this.setLevel(newLevel)
    })
  }

  setLevel(level){

    // if we are calling this to switch levels, destroy the current one
    if(this.level){
      this.level.destroy();
    }

    this.level = level
    this.addChild(level)
  }

  drawBackground(ctx){
    this.level?.background.drawImage(ctx, 0, 0)
  }

  drawForeground(ctx){
    this.inventory.draw(ctx, this.inventory.position.x, this.inventory.position.y)
    this.textBox.draw(ctx, 0, 0)
  }
}