import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { SearchObj } from '../search-obj';
import movies from '../../assets/movies.json';

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css']
})
export class MoviesTableComponent implements OnInit {

  @Input() search?: SearchObj;
  
  allMovies: any = movies;
  
  displayedMovies: Movie[] = [];
  
  constructor() { }

  onSearch() {
    console.log(this.search);
  }
  
  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.displayedMovies.push(this.allMovies[i]);
    }
  }
}
