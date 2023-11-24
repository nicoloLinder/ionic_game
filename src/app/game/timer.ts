import Entity from "./entity";
import MainScene from "./main-scene";

export default class Timer {

  numberValues!:Entity[];
  numberIndex!:number;
  seconds = 60;
  minutes = 40;
  
  constructor(scene: MainScene, x: number, y: number, spriteIndex: number) {
    this.numberValues = []
    this.numberIndex = spriteIndex;
    for (let i = 0; i < 5; i++) {
      this.numberValues.push(new Entity(scene, x - i*16, y,spriteIndex)); 
    }
  }

  clamp(num: number, min: number, max:number){
    return Math.min(Math.max(num, min), max);
  }
  
  public DecreaseCount(){
    this.seconds -= 1;
    if(this.seconds < 0){
      this.seconds = 59;
      this.minutes -= 1;
    }

    this.numberValues[0].setFrame(this.numberIndex+this.seconds%10);
    this.numberValues[1].setFrame(this.numberIndex+Math.floor(this.seconds/10)%10);
    this.numberValues[2].setFrame(this.numberIndex+10);
    this.numberValues[3].setFrame(this.numberIndex+this.minutes%10);
    this.numberValues[4].setFrame(this.numberIndex+Math.floor(this.minutes/10)%10);
  }

}