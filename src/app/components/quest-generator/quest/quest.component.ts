import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BossEnum, EnemyEnum, QuestEnum, SurroundingsEnum } from 'src/app/models/quest-attributes.enum';
import { DownloadImageService } from 'src/app/services/download-image/download-image.service';
import { NumberGeneratorService } from 'src/app/services/number-generator/number-generator.service';

@Component({
  selector: 'quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  public questCombinations: Array<any> = [];
  public questInfo: Array<any> = [];

  public questEnum = QuestEnum;
  public surroundingsEnum = SurroundingsEnum;
  public enemyEnum = EnemyEnum;
  public bossEnum = BossEnum;

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  @ViewChildren('downloadLinks') downloadLinks: QueryList<any>;
  @ViewChildren('canvasList') canvasList: QueryList<any>;

  constructor(elementRef: ElementRef, public numberGeneratorService: NumberGeneratorService, private downloadImageService: DownloadImageService) { 
    this.screen = elementRef.nativeElement.querySelector('#table');
    this.canvas = elementRef.nativeElement.querySelector('#canvas');
    this.downloadLink = elementRef.nativeElement.querySelector('#downloadLink');

    this.downloadLinks = elementRef.nativeElement.querySelectorAll('.downloadLinks');
    this.canvasList = elementRef.nativeElement.querySelectorAll('.canvasList');
  }

  ngOnInit(): void {
    this.generateQuestCombinations();
  }

  private generateQuestCombinations(): void {
    this.questCombinations = this.numberGeneratorService.generateCombo(true);
    this.questInfo = this.numberGeneratorService.calculateNftInfo(
        this.questCombinations, 
        [this.questEnum, this.surroundingsEnum, this.enemyEnum, this.bossEnum], 
        {
          "Combo": [],
          "Quest" : "",
          "Surroundings": "",
          "Enemies": "",
          "Boss": ""
        }
    );
    console.log(this.questCombinations);
  }

  public downloadImage(){
    this.downloadImageService.downloadImage(this.screen, this.canvas, this.downloadLink, this.downloadLinks, this.canvasList);
  }

}
