import { Component, OnInit } from '@angular/core';
import { BossEnum, EnemyEnum, QuestEnum, SurroundingsEnum } from 'src/app/models/quest-attributes.enum';
import { NumberGeneratorService } from 'src/app/services/number-generator/number-generator.service';

@Component({
  selector: 'quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  public questCombinations: Array<any> = [];

  public questEnum = QuestEnum;
  public surroundingsEnum = SurroundingsEnum;
  public enemyEnum = EnemyEnum;
  public bossEnum = BossEnum;

  constructor(private numberGeneratorService: NumberGeneratorService) { }

  ngOnInit(): void {
    this.generateQuestCombinations();
  }

  private generateQuestCombinations(): void {
    this.questCombinations = this.numberGeneratorService.generateCombo();
    console.log(this.questCombinations);
  }

}
