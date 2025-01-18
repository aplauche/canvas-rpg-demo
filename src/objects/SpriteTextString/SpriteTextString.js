import {GameObject} from "../../GameObject.js";
 import {resources} from "../../Resources.js";
 import {Vector2} from "../../Vector2.js";
 import {Sprite} from "../../Sprite.js";
 import {getCharacterFrame, getCharacterWidth} from "./spriteFontMap.js";
 
 export class SpriteTextString extends GameObject {
   constructor(str) {
     super({
       position: new Vector2(32, 108)
     });

     this.drawLayer = "HUD"

     const content = str ?? "Default text";
 
     // Create an array of words (because it helps with line wrapping later)
     this.words = content.split(" ").map(word => {
 
       // We need to know how wide this word is
       let wordWidth = 0;
 
       // Break each word into single characters
       const chars = word.split("").map(char => {
         // Measure each one
         const charWidth = getCharacterWidth(char);
         wordWidth += charWidth;
 
         // for each character return the width of the char and a sprite for it to draw
         return {
           width: charWidth,
           sprite: new Sprite({
             resource: resources.images.fontWhite,
             hFrames: 13,
             vFrames: 6,
             frame: getCharacterFrame(char)
           })
         }
       })
 
       // Transform each word instead into a width and array of charater sprites
       return {
         wordWidth,
         chars
       }
     })
 
     // Create background for text
     this.backdrop = new Sprite({
       resource: resources.images.textBox,
       frameSize: new Vector2(256, 64)
     })
   }
 
   drawImage(ctx, drawPosX, drawPosY) {
     // Draw the backdrop
     this.backdrop.drawImage(ctx, drawPosX, drawPosY)
 
     // Configuration options
     const PADDING_LEFT = 7;
     const PADDING_TOP = 7;
     const LINE_WIDTH_MAX = 240;
     const LINE_VERTICAL_HEIGHT = 14;
 
     // Initial position of cursor
     let cursorX = drawPosX + PADDING_LEFT;
     let cursorY = drawPosY + PADDING_TOP;
 
     this.words.forEach(word => {
 
       // Decide if we can fit this next word on this next line
       const spaceRemaining = drawPosX + LINE_WIDTH_MAX - cursorX;
       if (spaceRemaining < word.wordWidth) {
          // jump to next line
         cursorX = drawPosX + PADDING_LEFT
         cursorY += LINE_VERTICAL_HEIGHT;
       }
 
       // Draw this whole segment of text
       word.chars.forEach(char => {
         const {sprite, width} = char;
 
         const withCharOffset = cursorX - 5; // this gets rid of the first extra 5 pixels of white space within each character cell from the sprite sheet
         sprite.draw(ctx, withCharOffset, cursorY)
 
         // Add width of the character we just printed to cursor pos
         cursorX += width;
 
         // plus 1px between character
         cursorX += 1;
       })
 
       // Move the cursor over 3px between each word
       cursorX += 3;
     })
   }
 }