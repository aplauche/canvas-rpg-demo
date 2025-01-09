import { gridCells } from "../helpers/grid";
import { canvasDimensions } from "../main";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { resources } from "../Resources";
import { Sprite } from "../Sprite";


export class OutdoorLevel1 extends Level {
  constructor(){
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
    
    const hero = new Hero(gridCells(6), gridCells(5))
    this.addChild(hero)
    
    const rod = new Rod(gridCells(7), gridCells(6))
    this.addChild(rod)

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
}



// export const walls = new Set()

// // TODO: use gridCells function here to make more readable
// walls.add(`64,48`); // tree
 
// walls.add(`64,64`); // squares
// walls.add(`64,80`);
// walls.add(`80,64`);
// walls.add(`80,80`);

// walls.add(`112,80`); // water
// walls.add(`128,80`);
// walls.add(`144,80`);
// walls.add(`160,80`);