import { Component, OnInit, Input } from '@angular/core';
import _ from 'underscore';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies-by-cast',
  templateUrl: './movies-by-cast.component.html',
  styleUrls: ['./movies-by-cast.component.css']
})
export class MoviesByCastComponent implements OnInit {

  constructor() { }

  @Input() allMovies?: Movie[]; // passed from search-bar
  
  
  displayedMovies: {[index:string]: Movie[]} = {};
  
  show() {
    console.log(this.allMovies);
    let movies: Movie[] = [];
    let cast: string[] = [];
    if(this.allMovies != null) {
      movies = _.shuffle(this.allMovies);
      for (let i = 0; i < 100; i++) {
        let mv: Movie = movies[i];
        mv.cast.forEach(actor => {
          if(!(actor in cast)) {
            if(this.displayedMovies[actor] != null) {
              this.displayedMovies[actor].push(mv);
            } else {
              this.displayedMovies[actor] = [mv];
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
