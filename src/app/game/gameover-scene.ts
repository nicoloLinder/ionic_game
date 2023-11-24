export default class GameoverScene extends Phaser.Scene {
  preload() {
    console.log("preload");
    this.load.image("tiles", "assets/tilemap/colored_packed.png")
    this.load.spritesheet('tileSprites', "assets/tilemap/colored_packed.png", {frameHeight: 16, frameWidth: 16})
  }

  create() {
    const array = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 923, 917, 929, 921, 0, 0, 0],
      [0, 0, 0, 967, 974, 921, 970, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    const map = this.make.tilemap({data: array, tileWidth: 16, tileHeight: 16})
    const tiles = map.addTilesetImage("tiles");
    const layer = map.createLayer(0, map.tilesets[0], 0, 0);
    
    // @ts-ignore
    const button = this.add.sprite(16*5,16*7-8, 'tileSprites', 1004).setInteractive();
    // @ts-ignore
    button.on('pointerover', function(event){
      // @ts-ignore
      button.setFrame(1004+49);
    });
    
    // @ts-ignore
    button.on('pointerout', function(event){
      // @ts-ignore
      button.setFrame(1004);
    });
    // @ts-ignore
    button.on('pointerdown', function(event){
      // @ts-ignore
      this.scene.manager.get
    });
    
  }
}