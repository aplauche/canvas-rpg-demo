import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { canvasDimensions } from "../main";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { resources } from "../Resources";
import { Sprite } from "../Sprite";
import { OutdoorLevel1 } from "./OutdoorLevel1";

export class CaveLevel1 extends Level {
  constructor(){
    super({})

    this.background = new Sprite({
      resource: resources.images.cave,
      frameSize: canvasDimensions
    })

    const ground = new Sprite({
      resource: resources.images.caveGround,
      frameSize: canvasDimensions
    })
    this.addChild(ground)

    const exit = new Exit(gridCells(3), gridCells(4))
    this.addChild(exit)

    const hero = new Hero(gridCells(5), gridCells(6))
    this.addChild(hero)

    this.walls = new Set()
  }

  ready(){
    events.on("HERO_EXITED", this, () => {
      console.log("Change scene");
      events.emit("CHANGE_LEVEL", new OutdoorLevel1())
    })
  }
}