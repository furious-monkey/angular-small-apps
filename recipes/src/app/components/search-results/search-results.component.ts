import { Component, OnInit } from '@angular/core';
import { Recipes } from 'src/app/shared/recipes';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  recipes: Recipes[] = [];

  constructor(private search: SearchService) {
    this.getRecipes();
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.search.getResults().subscribe((recipes) => this.recipes = recipes);
  }
}
