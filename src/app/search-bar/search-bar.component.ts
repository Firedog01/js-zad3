import { Component, OnInit } from '@angular/core';
import { SearchObj } from '../search-obj';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchObj: SearchObj = {
    title: null,
    yearFrom: null,
    yearTo: null,
    cast: null
  }

  constructor() { }
  
  ngOnInit(): void {
  }

}
