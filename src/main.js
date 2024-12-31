import { GameLoop } from './GameLoop';
import { gridCells, isSpaceFree } from './helpers/grid';
import { moveTowards } from './helpers/moveTowards';
import { DOWN, Input, LEFT, RIGHT, UP } from './Input';
import { walls } from './levels/level1';
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
  position: new Vector2(gridCells(6), gridCells(5))
 })


const heroDestination = hero.position.duplicate()


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

const update = () => {

  const distance = moveTowards(hero, heroDestination, 1)
  const hasArrived = distance <= 0; // tune this value if you want char to continue after release

  // ready to listen for move input again
  if(hasArrived){
    tryMove()
  }

}

const tryMove = () => {

  if(!input.direction) return;

  let nextX = heroDestination.x
  let nextY = heroDestination.y

  if (input.direction === DOWN) {
    nextY += gridCells(1)
    hero.frame = 0;
  }
  if (input.direction === UP) {
    nextY -= gridCells(1)
    hero.frame = 6;
  }
  if (input.direction === LEFT) {
    nextX -= gridCells(1)
    hero.frame = 9;
  }
  if (input.direction === RIGHT) {
    nextX += gridCells(1)
    hero.frame = 3;
  }

  if(isSpaceFree(walls, nextX, nextY)){
    heroDestination.x = nextX
    heroDestination.y = nextY
  }



}

const gameloop = new GameLoop(update, draw)

gameloop.start()