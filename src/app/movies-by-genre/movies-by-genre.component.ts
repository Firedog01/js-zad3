import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies-by-genre',
  templateUrl: './movies-by-genre.component.html',
  styleUrls: ['./movies-by-genre.component.css']
})
export class MoviesByGenreComponent implements OnInit {

  constructor() { }
  
  
  @Input() allMovies?: Movie[]; // passed from search-bar
  
  
  show() {
    console.log(this.allMovies);
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
