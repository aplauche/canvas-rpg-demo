import { Camera } from './Camera';
import { events } from './Events';
import { GameLoop } from './GameLoop';
import { GameObject } from './GameObject';
import { gridCells } from './helpers/grid';
import { Input} from './Input';
import { OutdoorLevel1 } from './levels/OutdoorLevel1';
import { Exit } from './objects/Exit/Exit';
import { Hero } from './objects/Hero/Hero';
import { Inventory } from './objects/Inventory/Inventory';
import { Main } from './objects/Main/Main';
import { Rod } from './objects/Rod/Rod';
import { resources } from './Resources';
import { Sprite } from './Sprite';
import './style.css'
import { Vector2 } from './Vector2';

const canvas = document.querySelector('#game-canvas');

export const canvasDimensions = new Vector2(320, 180)

const ctx = canvas.getContext("2d");

const mainScene = new Main({
  position: new Vector2(0,0)
})

mainScene.setLevel(new OutdoorLevel1())

events.on("HERO_EXITED", mainScene, () => {
  console.log("Change scene");
})

const draw = () => {
  // for a basic static canvas we can just draw:
  //mainScene.draw(ctx,0,0)

  // for a camera we need to draw the scene relative to the camera position
  ctx.clearRect(0,0,canvas.width, canvas.height) // clear the canvas

  // First just draw the sky statically
  mainScene.drawBackground(ctx)

  // save the current context state
  ctx.save()

  if(mainScene.camera){
    // offset everything
    ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y)
  }

  // draw the scene with everything offset by camera position
  mainScene.draw(ctx)

  // restore the saved state
  ctx.restore()

  // After translations, draw the UI elements
  mainScene.drawForeground(ctx)


}

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
}

const gameloop = new GameLoop(update, draw)

gameloop.start()