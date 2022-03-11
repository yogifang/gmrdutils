import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SearchPartsComponent } from './parts-searcher/search-parts/search-parts.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PartsSearcherModule } from './parts-searcher/parts-searcher.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchPartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule ,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    PartsSearcherModule,
    RouterModule.forRoot([
      {path: 'search-parts', component: SearchPartsComponent},

    ]),
    BrowserAnimationsModule
  ],

  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
