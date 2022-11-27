import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { SearchObj } from '../search-obj';

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css']
})
export class MoviesTableComponent implements OnInit {

  @Input() search?: SearchObj;
  
  movies: Movie[] = [];
  
  constructor() { }

  onSearch() {
    console.log(this.search);
  }
  
  ngOnInit(): void {
  }
}
