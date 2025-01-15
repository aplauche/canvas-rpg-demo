import { events } from "./Events";
import { Vector2 } from "./Vector2";

export class GameObject {
  constructor ({
    position
  } = {}){
    this.position = position ?? new Vector2(0,0)
    this.children = []
    this.parent = null
    this.isReady = false
  }

  // First entry point of the loop
  // This gets called in gameloop and then updates each child
  // root allows access to properties on the main scene from children
  stepEntry(delta, root) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.isReady) {
      this.isReady = true; // only set to ready once all children have been stepped
      this.ready();
    }

    // Call any implemented Step code
    this.step(delta, root);
  }

  // called once on every frame with deltatime passed - this will be implemented by children
  step(delta){

  }

  // called by individual game objects to setup listeners once added to main scene
  ready() {
    
  }

  /* draw entry */
  // This gets called in gameloop drawing the base and then rendering and drawing each child
  draw(ctx, x = 0, y = 0) {
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

  // each child removes itself from the parent, which also unsubscribes all events for that child
  destroy() {
    this.children.forEach((child) => child.destroy());
    this.parent.removeChild(this);
  }

  /* Other Game Objects are nestable inside this one */
  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    console.log('removing child', gameObject)
    events.unsubscribe(gameObject); // remove all event listeners from the removed child
    this.children = this.children.filter(g => {
      return gameObject !== g;
    })
  }
}