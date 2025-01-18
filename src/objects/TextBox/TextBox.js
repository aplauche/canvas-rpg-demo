import { GameObject } from "../../GameObject";
import { Sprite } from "../../Sprite";
import { resources } from "../../Resources";
import { Vector2 } from "../../Vector2";

export class TextBox extends GameObject {
  constructor(){
    super({
      position: new Vector2(32, 112)
    })
    this.content = "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "

    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64)
    })

    //this.addChild(this.backdrop)
  }


  // Custom implementation of draw image
  drawImage(ctx, drawPosX, drawPosY){
    // draw the backdrop
    this.backdrop.drawImage(ctx, drawPosX, drawPosY)
    // Now we draw text...
    ctx.font = "12px fontRetroGaming";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#fff";

    const MAX_WIDTH = 250;
    const LINE_HEIGHT = 20;
    const PADDING_LEFT = 10;
    const PADDING_TOP = 12;

    let words = this.content.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;

      // If the test line exceeds the maximum width, and it's not the first word...
      if (testWidth > MAX_WIDTH && n > 0) {
        // Go ahead and actually draw the current line
        ctx.fillText(line, drawPosX + PADDING_LEFT, drawPosY + PADDING_TOP);
        // Reset the line to start with the current word.
        line = words[n] + " ";
        // Move our cursor downwards
        drawPosY += LINE_HEIGHT;
      } else {
        line = testLine;
      }
    }
    // text to draw, starting x of cursor, starting y of cursor
    ctx.fillText(line, drawPosX+PADDING_LEFT, drawPosY+PADDING_TOP)
  }
}