import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MoviesTableComponent } from './movies-table/movies-table.component';
import { MoviesByGenreComponent } from './movies-by-genre/movies-by-genre.component';
import { MoviesByCastComponent } from './movies-by-cast/movies-by-cast.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    MoviesTableComponent,
    MoviesByGenreComponent,
    MoviesByCastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
