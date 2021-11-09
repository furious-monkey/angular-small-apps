import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipes } from 'src/app/shared/recipes';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  recipes: Recipes[] = [];

  constructor(private search: SearchService, private route: Router) {
    this.getRecipes();
  }

  ngOnInit(): void {
    if (this.recipes.length === 0) {
      const currentURL = this.route.url;
      const query = currentURL.replace('/search/', '');
      this.search.findResults(query);
    }
  }

  getRecipes(): void {
    this.search.getResults().subscribe((recipes) => this.recipes = recipes);
  }
}
