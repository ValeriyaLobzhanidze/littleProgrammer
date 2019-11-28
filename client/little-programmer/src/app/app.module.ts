import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodeViewerComponent } from './code-viewer/code-viewer.component';
import { CodeLineComponent } from './code-line/code-line.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    CodeViewerComponent,
    CodeLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
