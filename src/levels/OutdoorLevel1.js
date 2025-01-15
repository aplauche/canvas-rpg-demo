import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { canvasDimensions } from "../main";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { resources } from "../Resources";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { CaveLevel1 } from "./CaveLevel1";

// Default for hero start
const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(3))

export class OutdoorLevel1 extends Level {
  // allow params to be passed into level when init'd
  constructor(params = {}){
    super({})
    this.background = new Sprite({
      resource: resources.images.sky,
      frameSize: canvasDimensions,
    })

    const groundSprite = new Sprite({
      resource: resources.images.ground,
      frameSize: canvasDimensions,
    })
    this.addChild(groundSprite)
    
    const exit = new Exit(gridCells(6), gridCells(3))
    this.addChild(exit)
    
    // If a heroPosition is passed into params use that, otherwise use default
    this.heroStart = params.heroPosition ?? DEFAULT_HERO_POSITION
    const hero = new Hero(this.heroStart.x, this.heroStart.y)
    this.addChild(hero)
    
    const rod = new Rod(gridCells(7), gridCells(6))
    this.addChild(rod)

    // Create the walls for the level
    this.walls = new Set();
    this.walls.add(`64,48`); // tree
    this.walls.add(`64,64`); // squares
    this.walls.add(`64,80`);
    this.walls.add(`80,64`);
    this.walls.add(`80,80`);
    this.walls.add(`112,80`); // water
    this.walls.add(`128,80`);
    this.walls.add(`144,80`);
    this.walls.add(`160,80`);
    
  } 

  // listen for hero to collide with exit and then emit a level change for main to receive
  ready(){
    events.on("HERO_EXITED", this, () => {
      events.emit("CHANGE_LEVEL", new CaveLevel1({
        heroPosition: new Vector2(gridCells(3), gridCells(4))
      }))
    })
  }
}


