import Entity from "./entity";
import Score from "./score";
import Timer from "./timer";

export default class MainScene extends Phaser.Scene {
  private keyLeft: Phaser.Input.Keyboard.Key | undefined;
  private keyRight: Phaser.Input.Keyboard.Key | undefined;
  private KeyUp: Phaser.Input.Keyboard.Key | undefined;
  private KeyDown: Phaser.Input.Keyboard.Key | undefined;
  private keyShoot: Phaser.Input.Keyboard.Key | undefined;

  public cowIndex = 370;
  public ufoIndex = 994;

  ufo!: Entity;
  cow!: Entity;
  scoreCounter!: Score;
  timer!: Timer;

//  private tileset Phaser.Tilemaps.Tileset | undefined;

  constructor() {
    super({key: 'main'});
  }

  init() {
    console.log("init");
    this.KeyUp = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyLeft = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.KeyDown = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyRight = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


    this.keyShoot = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  preload() {
    console.log("preload");
    this.load.image("tiles", "assets/tilemap/colored_packed.png")
    this.load.spritesheet('tileSprites', "assets/tilemap/colored_packed.png", {frameHeight: 16, frameWidth: 16})
  }
  
  environment = [5,6,1,2,6,7,5,6,7,55,56]

  createGrass(){
    let array = [];

    for (let row = 0; row < this.sys.game.canvas.height/16; row++) {
      let subarry = [];
      for (let column = 0; column < this.sys.game.canvas.width/16; column++) {
        if(row == 0 || row == this.sys.game.canvas.height/16-1 || column == 0 || column == this.sys.game.canvas.width/16-1){
          subarry.push(0);
        }else{
          subarry.push(this.environment[this.getRandomInt(0,this.environment.length-1)]);
        }
      }
      array.push(subarry);
    }

    return array;
  }


  create() {

    const array = this.createGrass();
    const map = this.make.tilemap({data: array, tileWidth: 16, tileHeight: 16})
    const tiles = map.addTilesetImage("tiles");
    const layer = map.createLayer(0, map.tilesets[0], 0, 0);

    map.imageCollections

    this.cow = new Entity(this, 8 * this.getRandomInt(2, 10), 8 * this.getRandomInt(2, 10), this.cowIndex);
    this.cow.x = 16 * this.getRandomInt(2, 9) - 8;
    this.cow.y = 16 * this.getRandomInt(2, 8) - 8;

    this.ufo = new Entity(this, 8, 8, this.ufoIndex);
    this.scoreCounter = new Score(this, 16 * 10 - 8, 8, 17 * 49 + 49 - 14);
    this.timer = new Timer(this, 16 * 5 - 8, 8, 17 * 49 + 49 - 14);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
  }

  override update(time: number, delta: number) {
    this.ufo.update(time, delta);
    this.timer.DecreaseCount();
    // @ts-ignore
    if (Phaser.Input.Keyboard.JustDown(this.keyLeft)) {
      this.ufo.x -= 16;
    }
    // @ts-ignore
    else if (Phaser.Input.Keyboard.JustDown(this.keyRight)) {
      this.ufo.x += 16;
    }
    // @ts-ignore
    else if (Phaser.Input.Keyboard.JustDown(this.KeyUp)) {
      this.ufo.y -= 16;
    }
    // @ts-ignore
    else if (Phaser.Input.Keyboard.JustDown(this.KeyDown)) {
      this.ufo.y += 16;
    }


    if (this.ufo.x > this.sys.game.canvas.width) {
      this.ufo.x = 8
    } else if (this.ufo.x < 0) {
      this.ufo.x = this.sys.game.canvas.width - 8;
    }

    if (this.ufo.y > this.sys.game.canvas.height) {
      this.ufo.y = 8
    } else if (this.ufo.y < 0) {
      this.ufo.y = this.sys.game.canvas.height - 8;
    }

    if (this.ufo.y == this.cow.y && this.ufo.x == this.cow.x) {
      this.cow.x = 16 * this.getRandomInt(2, 9) - 8;
      this.cow.y = 16 * this.getRandomInt(2, 8) - 8;

      this.ufo.Smile();
      this.scoreCounter.IncrementCount();
    }
  }
}