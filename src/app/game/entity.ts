import MainScene from "./main-scene";

export default class Entity extends Phaser.Physics.Arcade.Sprite {

  smile!: Entity;
  mainScene!: MainScene;
  timeSinceSmile!:number

  constructor(scene: MainScene, x: number, y: number, spriteIndex: number) {
    super(scene, x, y, "tileSprites", spriteIndex);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.mainScene = scene;
  }

  Smile() {
    if (this.smile == null) {
      this.smile = new Entity(this.mainScene, this.x, this.y - 16, 15 * 49 + 49 - 14);
    }
    this.smile.alpha = 1;
    this.smile.x = this.x;
    this.smile.y = this.y - 16;
    this.timeSinceSmile = 0;
  }
  
  HideSmile(){
    if (this.smile != null) {
      this.smile.alpha = 0;
    }
  }
  
  override update(time: number, delta: number){
    if (this.smile != null) {
      this.timeSinceSmile += delta;
      if(this.timeSinceSmile > 1000){
        this.HideSmile()
      }
      this.smile.x = this.x;
      this.smile.y = this.y - 16;
    }
  }
}