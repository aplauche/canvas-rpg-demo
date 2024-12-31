import { GameLoop } from './GameLoop';
import { DOWN, Input, LEFT, RIGHT, UP } from './Input';
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
 })
const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32,32),
 })

const heroPos = new Vector2(16 * 6, 16 * 5);

const input = new Input()

const draw = () => {
  skySprite.drawImage(ctx,0,0)
  groundSprite.drawImage(ctx,0,0)

  // Center the Hero in the cell
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = heroPos.x+heroOffset.x;
  const heroPosY = heroPos.y+1+heroOffset.y;

  hero.drawImage(ctx,heroPosX,heroPosY)
  shadow.drawImage(ctx,heroPosX,heroPosY)
}

const update = () => {
  if (input.direction === DOWN) {
    heroPos.y += 1;
    hero.frame = 0;
  }
  if (input.direction === UP) {
    heroPos.y -= 1;
    hero.frame = 6;
  }
  if (input.direction === LEFT) {
    heroPos.x -= 1;
    hero.frame = 9;
  }
  if (input.direction === RIGHT) {
    heroPos.x += 1;
    hero.frame = 3;
  }
}

const gameloop = new GameLoop(update, draw)

gameloop.start()