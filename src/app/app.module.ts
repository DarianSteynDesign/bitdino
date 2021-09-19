import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DinoComponent } from './components/dino-generator/dino.component';
import { QuestComponent } from './components/quest-generator/quest/quest.component';

@NgModule({
  declarations: [
    AppComponent,
    DinoComponent,
    QuestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
