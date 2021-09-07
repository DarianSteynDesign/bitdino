import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberGeneratorService {

  public combinedResult = '';
  public resultAmount = 0;
  public cominationArray: Array<string> =[];
  public numberCombinations: Array<any> = [];

  constructor() { }

  public generateCombo(){
    let weighting = {1:0.1, 2:0.2, 3:0.3, 4:0.4, 5:0.5, 6:0.6, 7:0.8, 8:0.8, 9:0.9};
    //let weighting = {1:0.1, 2:0.1, 3:0.8, 4:0.8};
    this.cominationArray = [];
    
    for(var index = 0; index < 500; index++){
      this.calculateWeight(weighting);
    }

    return this.numberCombinations;
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
      if(this.resultAmount == 50){
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
    //this.numberCombinations.unshift([3, 2, 4, 3], [2, 5, 5, 5]);
    //this.calculateDinoInfo(this.numberCombinations);
    //console.log(this.numberCombinations);
  }
}
