import { Component, ElementRef, ViewChild } from '@angular/core';
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

constructor(elementRef: ElementRef) {
  this.screen = elementRef.nativeElement.querySelector('#table');
  this.canvas = elementRef.nativeElement.querySelector('#canvas');
  this.downloadLink = elementRef.nativeElement.querySelector('#downloadLink');
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
    if(this.resultAmount == 100){
      this.splitCombination(this.cominationArray);
    }
    this.combinedResult = '';
  }
}

public buildValue(value: any){
  this.combinedResult += value;
}   

public generateCombo(){
  let weighting = {1:0.1, 2:0.2, 3:0.3, 4:0.4, 5:0.5, 6:0.6, 7:0.8, 8:0.8, 9:0.9};
  //let weighting = {1:0.1, 2:0.1, 3:0.8, 4:0.8};
  this.cominationArray = [];
  
  for(var index = 0; index < 500; index++){
    this.calculateWeight(weighting);
  }
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
      
      if((index % 4) === 0){
        //this.numberCombinations.push(valueArray);
        valueArray = [];
      }
    });
  });
  //this.numberCombinations.unshift([1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5], [6, 6, 6, 6], [7, 7, 7, 7], [8, 8, 8, 8], [9, 9, 9, 9]);
  this.numberCombinations.unshift([1, 1, 1, 1], [2, 2, 2, 2]);
  console.log(this.numberCombinations);
}

public downloadImage(){

  html2canvas(this.screen.nativeElement).then((canvas:any) => {
        let ctx = canvas.getContext('2d');

        ctx.webkitImageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true;
        ctx.imageSmoothingEnabled = true;
        
        this.canvas.nativeElement.src = canvas.toDataURL();
        this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
        this.downloadLink.nativeElement.download = 'marble-diagram.png';
        this.downloadLink.nativeElement.click();
  });
  
  }

}
