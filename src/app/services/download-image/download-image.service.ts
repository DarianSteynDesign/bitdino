import { ElementRef, Injectable, QueryList, ViewChild, ViewChildren } from '@angular/core';
import html2canvas from 'html2canvas';
import { NumberGeneratorService } from '../number-generator/number-generator.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadImageService {
  private screen: any;
  private canvas: any;
  private downloadLink: any;
  private downloadLinks: any;
  private canvasList: any;
  
  constructor(private numberGeneratorService: NumberGeneratorService) { 

  }

  public downloadImage(screen: any, canvas: any, downloadLink: any, downloadLinks: any ,canvasList: any){
    let assetList = document.querySelectorAll('.card');
    let numberCombo = '';

    this.screen = screen;
    this.canvas = canvas;
    this.downloadLink = downloadLink;
    this.downloadLinks = downloadLinks;
    this.canvasList = canvasList;

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
    if(this.numberGeneratorService.numberCombinations[index][0] === true){
      this.numberGeneratorService.numberCombinations[index][0] = 'victory';
    } else if (this.numberGeneratorService.numberCombinations[index][0] === false) {
      this.numberGeneratorService.numberCombinations[index][0] = 'defeat';
    }
    return this.numberGeneratorService.numberCombinations[index].join("-");
  }

  public screenGrab(htmlElement: HTMLElement, numberCombo: string, currentElementIndex: number) {
    let options = {
      removeContainer: true, 
      backgroundColor: "rgba(0,0,0,0)", 
      foreignObjectRendering: false,
      scale: 2,
      dpi: 144
    }

    html2canvas(htmlElement, options).then((canvas:any) => {
      let ctx = canvas.getContext('2d');

      ctx.webkitImageSmoothingEnabled = true;
      ctx.mozImageSmoothingEnabled = true;
      ctx.imageSmoothingEnabled = true;

      this.updateCanvas(currentElementIndex, canvas.toDataURL());
      console.log(numberCombo);
      this.updateDownloadLinks(currentElementIndex, canvas.toDataURL('image/png'), 'quest-' + numberCombo + '.png');

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
}
