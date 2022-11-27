import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Movie } from '../movie';
import { SearchObj } from '../search-obj';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MoviesTableComponent implements OnInit {
  
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => { // read json asynchronously
      this.allMovies = data;
      this.show();
    });
  }
  
  
  private _jsonURL = 'assets/movies.json';
  
  @Input() search?: SearchObj; // passed from search-bar
  
  allMovies: Movie[] = [];
  
  displayedMovies: Movie[] = [];
  
  displayedCount: number = 10;
  
  
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  
  show() {
    let that = this; 
    let movies: Movie[] = _.filter(this.allMovies, function(movie) { // filter data using predicate
      if(that.search != null) { // required
        
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
          if(!movie.title.includes(that.search.title)) { // string includes substring
            return false;
          }
        }
        
        // cast
        if(that.search.cast != null) {
          if(!_.find(movie.cast, function(actor) { // if no cast string is found if will pass
            if(that.search != null) { // required
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
  
  onSearch() {
    console.log(this.search);
    this.show();
  }
  
  onShowMore() {
    this.displayedCount += 10;
    this.show();
  }
  
  ngOnInit(): void {
  }
}
