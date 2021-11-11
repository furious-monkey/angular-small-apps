import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipes } from 'src/app/shared/recipes';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  recipes: Recipes[] = [];
  query: string = '';
  by: string = '';

  constructor(
    private search: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getRecipes();
    this.route.params.subscribe((param) => {
      this.query = param['query'];
      this.by = param['by'];
    });
  }

  ngOnInit(): void {
    if (this.recipes.length === 0) {
      const currentURL = this.router.url.replace('%20', ' ');
      const byParam = currentURL.match(/(?:by=)(\w+)/i);
      const queryParam = currentURL.match(/(?:query=)([a-zA-Z\s]*)/i);
      this.query = (queryParam && queryParam[1]) || '';
      this.by = (byParam && byParam[1]) || '';

      this.search.findResults(this.query, this.by);
    }
  }

  getRecipes(): void {
    this.search.getResults().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
