import { Animations } from './Animations';
import { FrameIndexPattern } from './FrameIndexPattern';
import { GameLoop } from './GameLoop';
import { gridCells, isSpaceFree } from './helpers/grid';
import { moveTowards } from './helpers/moveTowards';
import { DOWN, Input, LEFT, RIGHT, UP } from './Input';
import { walls } from './levels/level1';
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './objects/Hero/heroAnimations';
import { resources } from './Resources';
import { Sprite } from './Sprite';
import './style.css'
import { Vector2 } from './Vector2';

const canvas = document.querySelector('#game-canvas');

const canvasDimensions = new Vector2(320, 180)

const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: canvasDimensions,
 })
const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: canvasDimensions,
 })
const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32,32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(5)),
  animations: new Animations({
    walkDown: new FrameIndexPattern(WALK_DOWN),
    walkUp: new FrameIndexPattern(WALK_UP),
    walkLeft: new FrameIndexPattern(WALK_LEFT),
    walkRight: new FrameIndexPattern(WALK_RIGHT),
    standDown: new FrameIndexPattern(STAND_DOWN),
    standUp: new FrameIndexPattern(STAND_UP),
    standLeft: new FrameIndexPattern(STAND_LEFT),
    standRight: new FrameIndexPattern(STAND_RIGHT),
  })
 })


const heroDestination = hero.position.duplicate()
let heroFacing = DOWN

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32,32),
 })


const input = new Input()

const draw = () => {
  skySprite.drawImage(ctx,0,0)
  groundSprite.drawImage(ctx,0,0)

  // Center the Hero in the cell
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x+heroOffset.x;
  const heroPosY = hero.position.y+1+heroOffset.y;

  hero.drawImage(ctx,heroPosX,heroPosY)
  shadow.drawImage(ctx,heroPosX,heroPosY)
}

const update = (delta) => {

  const distance = moveTowards(hero, heroDestination, 1)
  const hasArrived = distance <= 0; // tune this value if you want char to continue after release

  // ready to listen for move input again
  if(hasArrived){
    tryMove()
  }

  // hero animation
  hero.step(delta)

}

const tryMove = () => {

  // if no keyboard input just play the static or idle animations
  if(!input.direction) {
    if (heroFacing === LEFT) { hero.animations.play("standLeft")}
    if (heroFacing === RIGHT) { hero.animations.play("standRight")}
    if (heroFacing === UP) { hero.animations.play("standUp")}
    if (heroFacing === DOWN) { hero.animations.play("standDown")}
  }

  let nextX = heroDestination.x
  let nextY = heroDestination.y

  if (input.direction === DOWN) {
    nextY += gridCells(1)
    hero.animations.play("walkDown")
  }
  if (input.direction === UP) {
    nextY -= gridCells(1)
    hero.animations.play("walkUp")
  }
  if (input.direction === LEFT) {
    nextX -= gridCells(1)
    hero.animations.play("walkLeft")
  }
  if (input.direction === RIGHT) {
    nextX += gridCells(1)
    hero.animations.play("walkRight")
  }

  // update facing to last direction
  heroFacing = input.direction ?? heroFacing;

  if(isSpaceFree(walls, nextX, nextY)){
    heroDestination.x = nextX
    heroDestination.y = nextY
  }



}

const gameloop = new GameLoop(update, draw)

gameloop.start()