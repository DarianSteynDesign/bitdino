import { Component, OnInit, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import html2canvas from 'html2canvas';
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
  public dragonBlurbs: Array<string> =[
    "Likes to eat pie", 
    "Bigger than most dragons", 
    "Wacky as hell", 
    "Big heart, bigger D", 
    "Not too good with the ladies",
    "Has a special sauce, can get lost in it",
    "Always at your mom's house",
    "Flexer",
    "Scared of insects"
  ];
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

  constructor(elementRef: ElementRef, private numberGeneratorService: NumberGeneratorService) {
    this.screen = elementRef.nativeElement.querySelector('#table');
    this.canvas = elementRef.nativeElement.querySelector('#canvas');
    this.downloadLink = elementRef.nativeElement.querySelector('#downloadLink');

    this.downloadLinks = elementRef.nativeElement.querySelectorAll('.downloadLinks');
    this.canvasList = elementRef.nativeElement.querySelectorAll('.canvasList');
  }

  ngOnInit(): void {
  }

  public generateCombo(){
    this.numberCombinations = this.numberGeneratorService.generateCombo();
    this.calculateDinoInfo(this.numberGeneratorService.generateCombo());
  }

  public downloadImage(){
    let assetList = document.querySelectorAll('.card');
    let numberCombo = '';

    assetList.forEach((asset: any, index: number) => {
      numberCombo = this.getNumberCombo(index);
      if(index < 100){
        this.screenGrab(asset, numberCombo, index);
      } else {
        console.log('DONE DONE DONE DONE DONE DONE DONE DONE DONE!!!!!!!!!!!!!!!!!!!!!!!!!');
      }
    });
  }

  public getNumberCombo(index: number): string {
    return this.numberCombinations[index].join("-");
  }

  public screenGrab(htmlElement: HTMLElement, numberCombo: string, currentElementIndex: number) {
    html2canvas(htmlElement, {removeContainer: true}).then((canvas:any) => {
      let ctx = canvas.getContext('2d');

      ctx.webkitImageSmoothingEnabled = true;
      ctx.mozImageSmoothingEnabled = true;
      ctx.imageSmoothingEnabled = true;

      this.updateCanvas(currentElementIndex, canvas.toDataURL());
      this.updateDownloadLinks(currentElementIndex, canvas.toDataURL('image/png'), 'dino' + numberCombo + '.png');

      ctx.clearRect(0, 0, canvas.width, canvas.height)
    });
  }

  private updateDownloadLinks(currentElementIndex: number, canvasDataUrl: any, downloadInfo: any) {
    this.downloadLinks.toArray().forEach((link: any, index: number) => {
      if(currentElementIndex == index){
        link.nativeElement.href = canvasDataUrl;
        link.nativeElement.download = downloadInfo;
        link.nativeElement.click();
      }
    });
  }

  private updateCanvas(currentElementIndex: number, canvasData: any) {
    this.canvasList.toArray().forEach((canvas: any, index: number) => {
      if(currentElementIndex == index){
        canvas.nativeElement.src = canvasData;
      }
    });
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
