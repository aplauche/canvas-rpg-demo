import { events } from './Events';
import { GameLoop } from './GameLoop';
import { GameObject } from './GameObject';
import { gridCells } from './helpers/grid';
import { Input} from './Input';
import { Hero } from './objects/Hero/Hero';
import { resources } from './Resources';
import { Sprite } from './Sprite';
import './style.css'
import { Vector2 } from './Vector2';

const canvas = document.querySelector('#game-canvas');

const canvasDimensions = new Vector2(320, 180)

const ctx = canvas.getContext("2d");

const mainScene = new GameObject({
  position: new Vector2(0,0)
})

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: canvasDimensions,
})


const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: canvasDimensions,
})

const hero = new Hero(gridCells(6), gridCells(5))

mainScene.addChild(skySprite)
mainScene.addChild(groundSprite)
mainScene.addChild(hero)

mainScene.input = new Input()


events.on("HERO_POSITION_CHANGED", mainScene, (data) => {
  console.log(data)
})

const draw = () => {
  mainScene.draw(ctx,0,0)
}

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
}

const gameloop = new GameLoop(update, draw)

gameloop.start()