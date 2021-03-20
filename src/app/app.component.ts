import { Component } from '@angular/core';

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
public dragonBlurbs: Array<string> =['Likes to eat pie', 'Bigger than most dragons', 'Wacky as hell', 'Big heart, bigger D'];
public numberCombinations: Array<any> = [];

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
  //let weighting = {0:0.1, 1:0.9, 2:0.3, 3:0.4, 4:0.5, 5:0.6, 6:0.7, 7:0.8, 8:0.8, 9:0.9};
  let weighting = {1:0.1, 2:0.1, 3:0.8, 4:0.8};
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
        this.numberCombinations.push(valueArray);
        valueArray = [];
      }
    });
  });

  console.log(this.numberCombinations);
}

}
