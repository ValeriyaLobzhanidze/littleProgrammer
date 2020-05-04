import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodeViewerComponent } from './code-viewer/code-viewer.component';
import { CodeLineComponent } from './code-line/code-line.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ProgrammingExplanationComponent } from './programming-explanation/programming-explanation.component';
import { PagePanelComponent } from './page-panel/page-panel.component';
import ComponentBuilderService from "./ComponentBuilderService";
import { CanvasComponent } from './canvascomponent/canvas.component';
import { PagerComponent } from './pager/pager.component';
import { SimplePopUpComponent } from './simple-pop-up/simple-pop-up.component';
import { SettingsPopupComponent } from './settings-popup/settings-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    CodeViewerComponent,
    CodeLineComponent,
    ControlPanelComponent,
    ProgrammingExplanationComponent,
    PagePanelComponent,
    CanvasComponent,
    PagerComponent,
    SimplePopUpComponent,
    SettingsPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ComponentBuilderService],
  bootstrap: [AppComponent],
  entryComponents: [ProgrammingExplanationComponent, CanvasComponent, SimplePopUpComponent, SettingsPopupComponent]
})
export class AppModule { }
