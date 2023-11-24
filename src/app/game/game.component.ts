import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import MainScene from './main-scene';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  standalone: true
})
export class GameComponent  implements OnInit {
  game: Phaser.Game | undefined;
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      scale:{
        parent: 'phaser-game-parent',
        width: '160',
        height: '144',
        zoom: 3
      },
      backgroundColor: '#1D1D26',
      parent: 'phaser-game-parent',
      physics: {
        default: 'arcade',
        arcade: {debug:false}
      },
      scene: [MainScene]
    };
  }
  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }
}