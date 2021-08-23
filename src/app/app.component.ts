import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  @ViewChildren('downloadLinks') downloadLinks: QueryList<any>;
  @ViewChildren('canvasList') canvasList: QueryList<any>;

  constructor(elementRef: ElementRef) {
    this.screen = elementRef.nativeElement.querySelector('#table');
    this.canvas = elementRef.nativeElement.querySelector('#canvas');
    this.downloadLink = elementRef.nativeElement.querySelector('#downloadLink');

    this.downloadLinks = elementRef.nativeElement.querySelectorAll('.downloadLinks');
    this.canvasList = elementRef.nativeElement.querySelectorAll('.canvasList');
  }

  public generateCombo(){
    let weighting = {1:0.1, 2:0.2, 3:0.3, 4:0.4, 5:0.5, 6:0.6, 7:0.8, 8:0.8, 9:0.9};
    //let weighting = {1:0.1, 2:0.1, 3:0.8, 4:0.8};
    this.cominationArray = [];
    
    for(var index = 0; index < 500; index++){
      this.calculateWeight(weighting);
    }
  }

  public calculateWeight(spec: any) {
    var i, j, table=[];
    
    for (i in spec) {
      for (j=0; j<spec[i]*10; j++) {
        table.push(i);
      }
    }
    var result = table[Math.floor(Math.random() * table.length)];
    if(this.combinedResult.toString().length < 4){
      this.buildValue(result);
    } else {
      this.cominationArray.push(this.combinedResult);
      this.resultAmount++;
      if(this.resultAmount == 20){
        this.splitCombination(this.cominationArray);
      }
      this.combinedResult = '';
    }
  }

  public buildValue(value: any){
    this.combinedResult += value;
  }   

  public splitCombination(comboArray: Array<string>) {
    let splitCombinations: Array<string> = [];

    comboArray.forEach((combo: any) => {
      splitCombinations.push(combo.split(''));
    });
    this.valueToNumber(splitCombinations);
  }

  public valueToNumber(arrayOfValues: any) {
    arrayOfValues.forEach((value: any) => {
      let valueArray: Array<any> = [];
      value.forEach((element: any, index: number) => {
        index++;
        valueArray.push(parseInt(element));
        
        if((index % 4) === 0 && index === 4){
          this.numberCombinations.push(valueArray);
          valueArray = [];
        }
      });
    });
    //this.numberCombinations.unshift([1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5], [6, 6, 6, 6], [7, 7, 7, 7], [8, 8, 8, 8], [9, 9, 9, 9]);
    //this.numberCombinations.unshift([1, 1, 1, 1], [5, 5, 5, 5]);
    console.log(this.numberCombinations);
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
        console.log(link);
        link.nativeElement.href = canvasDataUrl;
        link.nativeElement.download = downloadInfo;
        link.nativeElement.click();
      }
    });
  }

  private updateCanvas(currentElementIndex: number, canvasData: any) {
    this.canvasList.toArray().forEach((canvas: any, index: number) => {
      if(currentElementIndex == index){
        console.log(canvas);
        canvas.nativeElement.src = canvasData;
      }
    });
  }

}
