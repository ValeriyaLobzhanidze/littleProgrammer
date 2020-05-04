import {Component, OnInit, SimpleChanges} from '@angular/core';
import {SharedService} from "../SharedService";
import ParamsToChangeEntry from "../level1/ParamsToChangeEntry";
import Level1RootComponent from "../level1/Level1RootComponent";
import RollbackManager from "../RollbackManager";

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.css']
})
export class SettingsPopupComponent implements OnInit {
  private paramsToChange: ParamsToChangeEntry;
  private paramsInitState: ParamsToChangeEntry;
  private header: string = 'Game settings';

  private gridColor: string;
  private gridAlpha: number;

  private targetColor: string;
  private targetAlpha: number;

  constructor(private sharedService: SharedService, private curLevel: Level1RootComponent,
              private rollbackManager: RollbackManager) {
  }

  ngOnInit() {
    this.paramsInitState = this.curLevel.getCurLevelParams();
    this.paramsToChange = this.curLevel.getCurLevelParams();

    this.gridColor = this.paramsToChange.gridColor.substring(0, this.paramsToChange.gridColor.length - 2);
    this.gridAlpha = parseInt(this.paramsToChange.gridColor.substring(this.paramsToChange.gridColor.length - 2)) / 100;

    this.targetColor = this.paramsToChange.targetsColor.substring(0, this.paramsToChange.gridColor.length - 2);
    this.targetAlpha = parseInt(this.paramsToChange.targetsColor.substring(this.paramsToChange.gridColor.length - 2)) / 100;
  }

  private onChange(): void {
    this.rollbackManager.saveRollbackOperation(() => {
      this.sharedService.changeLevelParams(this.paramsInitState)
    });
    this.paramsToChange.targetsColor = this.targetColor + String(this.targetAlpha * 100);
    this.paramsToChange.gridColor = this.gridColor + String(this.gridAlpha * 100);
    this.sharedService.changeLevelParams(this.paramsToChange);
  }
}
