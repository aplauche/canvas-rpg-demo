import { Vector2 } from "./Vector2";

export class GameObject {
  constructor ({
    position
  }){
    this.position = position ?? new Vector2(0,0)
    this.children = []
  }

  // First entry point of the loop
  // This gets called in gameloop and then updates each child
  // root allows access to properties on the main scene from children
  stepEntry(delta, root) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call any implemented Step code
    this.step(delta, root);
  }

  // called once on every frame with deltatime passed - this will be implemented by children
  step(delta){

  }

  /* draw entry */
  // This gets called in gameloop drawing the base and then rendering and drawing each child
  draw(ctx, x, y) {
    console.log(this.position)
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    // Do the actual rendering for Images
    this.drawImage(ctx, drawPosX, drawPosY);

    // Pass on to children
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  // this will be implemented by children
  drawImage(ctx, drawPosX, drawPosY) {
    //...
  }

  /* Other Game Objects are nestable inside this one */
  addChild(gameObject) {
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    this.children = this.children.filter(g => {
      return gameObject !== g;
    })
  }
}