import { Injectable, ɵɵsetComponentScope } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberGeneratorService {

  public combinedResult = '';
  public resultAmount = 0;
  public cominationArray: Array<string> =[];
  public numberCombinations: Array<any> = [];
  public outcomeArray: Array<boolean> = [];
  private isQuest: boolean = false;

  constructor() { }

  public generateCombo(isQuest?: boolean){
    //quest weighting
    let weighting = {1:0.1, 2:0.2, 3:0.2, 4:0.5, 5:0.5, 6:0.5, 7:0.8, 8:0.9, 9:0.9};

    //Dino weighting
    //let weighting = {1:0.1, 2:0.2, 3:0.3, 4:0.4, 5:0.5, 6:0.6, 7:0.8, 8:0.8, 9:0.9};

    //Test weighting
    //let weighting = {1:0.1, 2:0.1, 3:0.8, 4:0.8};
    if(isQuest){
      this.isQuest = isQuest;
    }

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
      if(this.resultAmount == 2){
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
      let outcome: boolean = false;

      value.forEach((element: any, index: number) => {
        index++;
        valueArray.push(parseInt(element));
        
        if((index % 4) === 0 && index === 4) {
          if(this.isQuest) {
            outcome = this.generateOutcome(valueArray[2], valueArray[3]);
            this.numberCombinations.push(valueArray);
            this.numberCombinations.push([outcome, valueArray[2], valueArray[3]]);
          } else {
            this.numberCombinations.push(valueArray);
          }

          valueArray = [];
        }
      });
    });
    //this.numberCombinations.unshift([1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5], [6, 6, 6, 6], [7, 7, 7, 7], [8, 8, 8, 8], [9, 9, 9, 9]);
    //this.numberCombinations.unshift([3, 2, 4, 3], [2, 5, 5, 5]);
  }

  public calculateNftInfo(comboList: Array<number>, enumList: Array<any>, nftInfo: any): Array<any> {
    let nftInfoArray: Array<any> = []; 
    let enumList1 = enumList[0];
    let enumList2 = enumList[1];
    let enumList3 = enumList[2];
    let enumList4 = enumList[3];

    // enumList.forEach((selectedEnum: any) => {
    //   console.log(selectedEnum);

    //   Object.keys(nftInfo).map(key => {
    //     console.log(key)
    //     nftInfo[key] = selectedEnum[1];
    //     console.log(nftInfo);
    //   });
    // });

    comboList.forEach((combo: any) => {
      combo.forEach((rarityNumber: number, index: number) => {
        index === 0 ? nftInfo.Quest = enumList1[rarityNumber] : '';
        index === 1 ? nftInfo.Surroundings = enumList2[rarityNumber] : '';
        index === 2 ? nftInfo.Enemies = enumList3[rarityNumber] : '';
        index === 3 ? nftInfo.Boss = enumList4[rarityNumber] : '';
        //console.log(rarityNumber);
        //console.log(nftInfo);
        nftInfo.Combo = combo;

        if(index === (combo.length - 1)){
          nftInfoArray.push(nftInfo);
          nftInfo = {

          };
          //console.log("Combo: ", combo, "DinoInfo: ", dinoInfoArray);
        }
      });
    });
    
    console.log(nftInfoArray);
    return nftInfoArray;
  }

  public generateOutcome(enemyValue: number, bossValue: number): boolean {
    let outcome: boolean = false;
    let newPercentage: number = 0;
    let enemyPercentage: string = '0.';
    let bossPercentage: string = '0.';

    enemyPercentage += enemyValue.toString();
    bossPercentage += bossValue.toString();

    newPercentage = (parseFloat(enemyPercentage) + parseFloat(bossPercentage)) / 2;
    outcome = Math.random() < newPercentage;

    console.log(enemyPercentage, bossPercentage, newPercentage, outcome);
    //console.log('Outcome is - ', outcome);
    return outcome;
  }

}
