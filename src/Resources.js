

class Resources {
  constructor(){
    // everything that will get downloaded
    this.toLoad = {

      rod: "/sprites/rod.png",
      shadow: "/sprites/shadow.png",
      hero: "/sprites/hero-sheet.png",
      exit: "/sprites/exit.png",

      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",

      cave: "/sprites/cave.png",

      caveGround: "/sprites/cave-ground.png",
      knight: "/sprites/knight-sheet-1.png",

      textBox: "/sprites/text-box.png"
    }

    // bucket for all image assets
    this.images = {}

    // load all the images 
    Object.keys(this.toLoad).forEach(key => {
      const img = new Image();
      img.src = this.toLoad[key]
      this.images[key] = {
        image: img,
        isLoaded: false
      }
      img.onload =() => {
        this.images[key].isLoaded = true
      }
    })

    // this works as a safety check, if you try to draw image with non-loaded image, errors will occur
  }
}

export const resources = new Resources();