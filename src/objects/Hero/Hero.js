import { Animations } from "../../Animations"
import { events } from "../../Events"
import { FrameIndexPattern } from "../../FrameIndexPattern"
import { GameObject } from "../../GameObject"
import { gridCells, isSpaceFree } from "../../helpers/grid"
import { moveTowards } from "../../helpers/moveTowards"
import { DOWN, LEFT, RIGHT, UP } from "../../Input"
// import { walls } from "../../levels/OutdoorLevel1"
import { resources } from "../../Resources"
import { Sprite } from "../../Sprite"
import { Vector2 } from "../../Vector2"
import { PICK_UP_DOWN, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./heroAnimations"

export class Hero extends GameObject {
  constructor(x,y){
    super({
      position: new Vector2(x, y)
    })

    this.shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32,32),
      position: new Vector2(-8,-18),
     })

    this.addChild(this.shadow)

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32,32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      // use position to nudge the sprite to match up with game object positioning
      position: new Vector2(-8,-20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        pickUp: new FrameIndexPattern(PICK_UP_DOWN),
      })
     })

    this.addChild(this.body)

    this.facingDirection = DOWN
    this.destination = this.position.duplicate()
    this.previousPosition = new Vector2(0,0)

    this.pickupTimer = 0
    this.pickupShell = null

    events.on("ITEM_PICKUP", this, (data) => {
      this.handleItemPickup(data)
    })
  }

  tryMove(root) {
    const {input} = root

    // if no keyboard input just play the static or idle animations
    if(!input.direction) {
      if (this.facingDirection === LEFT) { this.body.animations.play("standLeft")}
      if (this.facingDirection === RIGHT) { this.body.animations.play("standRight")}
      if (this.facingDirection === UP) { this.body.animations.play("standUp")}
      if (this.facingDirection === DOWN) { this.body.animations.play("standDown")}
    }
  
    let nextX = this.destination.x
    let nextY = this.destination.y
  
    if (input.direction === DOWN) {
      nextY += gridCells(1)
      this.body.animations.play("walkDown")
    }
    if (input.direction === UP) {
      nextY -= gridCells(1)
      this.body.animations.play("walkUp")
    }
    if (input.direction === LEFT) {
      nextX -= gridCells(1)
      this.body.animations.play("walkLeft")
    }
    if (input.direction === RIGHT) {
      nextX += gridCells(1)
      this.body.animations.play("walkRight")
    }
  
    // update facing to last direction
    this.facingDirection = input.direction ?? this.facingDirection;
  
    // Check for obstructions
    const noWalls = isSpaceFree(root.level?.walls, nextX, nextY)
    // Check if any children of level have are solid and are blocking move with find
    const noSolidObjects = !this.parent.children.find(child => {
      return child.isSolid && child.position.x === nextX && child.position.y === nextY
    }) // will return false if nothing found

    // if clear go ahead and move
    if(noWalls && noSolidObjects){
       this.destination.x = nextX
       this.destination.y = nextY
    }
  
  
  
  }

  emitPosition(){
    if(this.position.x === this.previousPosition.x && this.position.y === this.previousPosition.y){
      return
    }
    events.emit("HERO_POSITION_CHANGED", this.position)
    this.previousPosition = this.position.duplicate()
  }

  handleItemPickup({image, position}){
    // stop any movement to pause player at position of item
    this.destination = position.duplicate()
    // trigger the times to display the pickup animation
    this.pickupTimer = 1000

    this.pickupShell = new Sprite({
      resource: image,
      position: new Vector2(0,-16) // bump up sprite a bit above head
    })

    this.addChild(this.pickupShell) // render it

  }

  step(delta, root) {

    // handle item pickups
    //  for more complex instances use a state machine
    // this.state = "ITEM_PICKUP" or this.state = "IDLE" etc
    if(this.pickupTimer > 0){
      this.pickupTimer -= delta
      this.body.animations.play("pickUp")

      if(this.pickupTimer <= 0){
        this.pickupShell.destroy()
      }
      return
    }

    const distance = moveTowards(this, this.destination, 1)
    const hasArrived = distance <= 0; // tune this value if you want char to continue after release
  
    // ready to listen for move input again
    if(hasArrived){
      this.tryMove(root)
    }

    this.emitPosition()
  }
}