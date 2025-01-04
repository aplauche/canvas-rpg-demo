import { Camera } from './Camera';
import { events } from './Events';
import { GameLoop } from './GameLoop';
import { GameObject } from './GameObject';
import { gridCells } from './helpers/grid';
import { Input} from './Input';
import { Hero } from './objects/Hero/Hero';
import { Inventory } from './objects/Inventory/Inventory';
import { Rod } from './objects/Rod/Rod';
import { resources } from './Resources';
import { Sprite } from './Sprite';
import './style.css'
import { Vector2 } from './Vector2';

const canvas = document.querySelector('#game-canvas');

export const canvasDimensions = new Vector2(320, 180)

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

//mainScene.addChild(skySprite)
mainScene.addChild(groundSprite)
mainScene.addChild(hero)


const camera = new Camera()
mainScene.addChild(camera)

const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod)

const inventory = new Inventory()

mainScene.input = new Input()

const draw = () => {
  // for a basic static canvas we can just draw:
  //mainScene.draw(ctx,0,0)

  // for a camera we need to draw the scene relative to the camera position
  ctx.clearRect(0,0,canvas.width, canvas.height) // clear the canvas

  // First just draw the sky statically
  skySprite.drawImage(ctx,0,0)

  // save the current context state
  ctx.save()

  // offset everything
  ctx.translate(camera.position.x, camera.position.y)

  // draw the scene with everything offset by camera position
  mainScene.draw(ctx,0,0)

  // restore the saved state
  ctx.restore()

  // After translations, draw the UI elements
  inventory.draw(ctx,0,0)


}

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
}

const gameloop = new GameLoop(update, draw)

gameloop.start()