import Entity from "./entity";
import MainScene from "./main-scene";

export default class Score {
  
  numberValues!:Entity[];
  numberIndex!:number;
  count = 1;
  constructor(scene: MainScene, x: number, y: number, spriteIndex: number) {
    this.numberValues = []
    this.numberIndex = spriteIndex;
    for (let i = 0; i < 4; i++) {
      this.numberValues.push(new Entity(scene, x - i*16, y,spriteIndex)); 
    }
  }
  
  public IncrementCount(){
    this.count += 1;
    
    this.numberValues[0].setFrame(this.numberIndex+this.count%10);
    this.numberValues[1].setFrame(this.numberIndex+Math.floor(this.count/10)%10);
    this.numberValues[2].setFrame(this.numberIndex+Math.floor(this.count/100)%10);
    this.numberValues[3].setFrame(this.numberIndex+Math.floor(this.count/1000)%10);
  }
  
}