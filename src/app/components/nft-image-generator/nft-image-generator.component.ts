import { Component, OnInit, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DownloadImageService } from 'src/app/services/download-image.service';
import { NumberGeneratorService } from 'src/app/services/number-generator.service';
import { AssetAssignmentEnum, BiomeEnum, BodyEnum, FaceAccEnum, HighlightsEnum, TailEnum } from '../../models/dino-attributes.enum';

@Component({
  selector: 'nft-image-generator',
  templateUrl: './nft-image-generator.component.html',
  styleUrls: ['./nft-image-generator.component.scss']
})
export class NftImageGeneratorComponent implements OnInit {

  title = 'cryptics';

  public combinedResult = '';
  public resultAmount = 0;
  public cominationArray: Array<string> =[];
  public numberCombinations: Array<any> = [];
  public assetAssignmentEnum = AssetAssignmentEnum;
  public biomeEnum = BiomeEnum;
  public bodyEnum = BodyEnum;
  public faceAccEnum = FaceAccEnum;
  public highlightsEnum = HighlightsEnum;
  public tailEnum = TailEnum;

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  @ViewChildren('downloadLinks') downloadLinks: QueryList<any>;
  @ViewChildren('canvasList') canvasList: QueryList<any>;

  constructor(elementRef: ElementRef, private numberGeneratorService: NumberGeneratorService, private downloadImageService: DownloadImageService) {
    this.screen = elementRef.nativeElement.querySelector('#table');
    this.canvas = elementRef.nativeElement.querySelector('#canvas');
    this.downloadLink = elementRef.nativeElement.querySelector('#downloadLink');

    this.downloadLinks = elementRef.nativeElement.querySelectorAll('.downloadLinks');
    this.canvasList = elementRef.nativeElement.querySelectorAll('.canvasList');
  }

  ngOnInit(): void {
  }

  public downloadImage(){
    this.downloadImageService.downloadImage(this.screen, this.canvas, this.downloadLink, this.downloadLinks, this.canvasList);
  }

  public generateCombo(){
    this.numberCombinations = this.numberGeneratorService.generateCombo();
    this.calculateDinoInfo(this.numberGeneratorService.generateCombo());
  }

  private calculateDinoInfo(comboList: Array<number>): void {
    let dinoInfo: any = {
      "Combo": [],
      "Body" : "",
      "FaceAcc": "",
      "Highlights": "",
      "Tail": "",
      "Biome": "",
    };
    let dinoInfoArray: Array<any> = [];
    comboList.forEach((combo: any) => {
      combo.forEach((element: number, index: number) => {
        index === 0 ? dinoInfo.Body = this.bodyEnum[element] : '';
        index === 2 ? dinoInfo.FaceAcc = this.faceAccEnum[element] : '';
        index === 1 ? dinoInfo.Highlights = this.highlightsEnum[element] : '';
        index === 2 ? dinoInfo.Tail = this.tailEnum[element] : '';
        index === 3 ? dinoInfo.Biome = this.biomeEnum[element] : '';
        dinoInfo.Combo = combo;
        
        if(index === (combo.length - 1)){
          dinoInfoArray.push(dinoInfo);
          dinoInfo = {
            "Combo": [],
            "Body" : "",
            "FaceAcc": "",
            "Highlights": "",
            "Tail": "",
            "Biome": "",
          };
          //console.log("Combo: ", combo, "DinoInfo: ", dinoInfoArray);
        }
      })
    })
  }

}
