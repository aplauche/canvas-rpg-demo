import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { canvasDimensions } from "../main";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { resources } from "../Resources";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { OutdoorLevel1 } from "./OutdoorLevel1";


// Default for hero start
const DEFAULT_HERO_POSITION = new Vector2(gridCells(3), gridCells(4))

export class CaveLevel1 extends Level {
  // allow params to be passed into level when init'd
  constructor(params = {}){
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

    // If a heroPosition is passed into params use that, otherwise use default
    this.heroStart = params.heroPosition ?? DEFAULT_HERO_POSITION
    const hero = new Hero(this.heroStart.x, this.heroStart.y)
    this.addChild(hero)

    this.walls = new Set()
  }

  ready(){
    events.on("HERO_EXITED", this, () => {
      console.log("Change scene");
      events.emit("CHANGE_LEVEL", new OutdoorLevel1({
        heroPosition: new Vector2(gridCells(6), gridCells(3))
      }))
    })
  }
}