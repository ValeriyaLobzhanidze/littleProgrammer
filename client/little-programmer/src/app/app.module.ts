import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodeViewerComponent } from './code-viewer/code-viewer.component';
import { CodeLineComponent } from './code-line/code-line.component';
import {SharedService} from "./SharedService";
import { PopUpComponent } from './popup/pop-up.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ProgrammingExplanationComponent } from './programming-explanation/programming-explanation.component';
import { ProgrammingExplanationListComponent } from './programming-explanation-list/programming-explanation-list.component';
import { PagePanelComponent } from './page-panel/page-panel.component';
import ComponentBuilderService from "./ComponentBuilderService";
import { GameDemonstrationPopUpComponent } from './game-demonstration-pop-up/game-demonstration-pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    CodeViewerComponent,
    CodeLineComponent,
    PopUpComponent,
    ControlPanelComponent,
    ProgrammingExplanationComponent,
    ProgrammingExplanationListComponent,
    PagePanelComponent,
    GameDemonstrationPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SharedService, ComponentBuilderService],
  bootstrap: [AppComponent],
  entryComponents: [ProgrammingExplanationComponent, ProgrammingExplanationListComponent, GameDemonstrationPopUpComponent]
})
export class AppModule { }
