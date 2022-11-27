import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Movie } from '../movie';
import { SearchObj } from '../search-obj';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { isEmpty } from 'underscore';

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MoviesTableComponent implements OnInit {

  private _jsonURL = 'assets/movies.json';
  
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.allMovies = data;
      this.show();
      console.log(this.allMovies);
    });
  }
  
  // @Input() search: SearchObj = {
  //   title: null,
  //   yearFrom: null,
  //   yearTo: null,
  //   cast: null
  // };
  @Input() search?: SearchObj;
  
  allMovies: Movie[] = [];
  
  displayedMovies: Movie[] = [];
  
  displayedCount: number = 10;
  

  onSearch() {
    console.log(this.search);
    this.show();
  }
  
  show() {
    let that = this;
    let movies: Movie[] = _.filter(this.allMovies, function(movie) {
      if(that.search != null) {
        if(that.search.yearFrom != null) {
          if(movie.year < that.search.yearFrom) {
            return false;
          }
        }
        if(that.search.yearTo != null) {
          if(movie.year > that.search.yearTo) {
            return false;
          }
        }
        if(that.search.title != null) {
          if(!movie.title.includes(that.search.title)) {
            return false;
          }
        }
        if(that.search.cast != null) {
          if(!_.find(movie.cast, function(actor) { // powodzenia z ogarnięciem tego
            if(that.search != null) {
              if(that.search.cast != null) {
                return actor.includes(that.search.cast);
              }
            }
            return true;
          })) {
            return false;
          }
        }
      }
      return true;
    })
    this.displayedMovies = [];
    for (let i = 0; i < this.displayedCount; i++) {
      this.displayedMovies.push(movies[i]);
    }
  }
  
  onShowMore() {
    this.displayedCount += 10;
    this.show();
  }
  
  ngOnInit(): void {
  }
}
