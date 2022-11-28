import { Component, OnInit, Input } from '@angular/core';
import _ from 'underscore';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies-by-genre',
  templateUrl: './movies-by-genre.component.html',
  styleUrls: ['./movies-by-genre.component.css']
})
export class MoviesByGenreComponent implements OnInit {

  constructor() { }
  
  
  @Input() allMovies?: Movie[]; // passed from search-bar
  
  displayedMovies: {[index:string]: Movie[]} = {};
  
  
  show() {
    console.log(this.allMovies);
    let movies: Movie[] = [];
    let genres: string[] = [];
    if(this.allMovies != null) {
      movies = _.shuffle(this.allMovies);
      for (let i = 0; i < 100; i++) {
        let mv: Movie = movies[i];
        mv.genres.forEach(genre => {
          if(!(genre in genres)) {
            if(this.displayedMovies[genre] != null) {
              this.displayedMovies[genre].push(mv);
            } else {
              this.displayedMovies[genre] = [mv];
            }
          }
        });
      }
      console.log(this.displayedMovies);
    }
  }
  
  // convoluted but works
  waitForAllMovies() {
    let that = this;
    setTimeout(function() {
      if(that.allMovies != null) {
        if(that.allMovies.length != 0) {
          that.show(); // if loaded show
          return;
        }
      }
      that.waitForAllMovies();
    }, 100);
  }
  

  ngOnInit(): void {
    this.waitForAllMovies();
  }
}
