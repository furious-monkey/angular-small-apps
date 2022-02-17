import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipes } from '../recipes';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private results = new BehaviorSubject<Recipes[]>([]);

  constructor(private recipes: RecipesService) {}

  getResults() {
    return this.results.asObservable();
  }

  findResults(query: string, by: string) {
    switch (by) {
      case 'name':
        this.recipes
          .getRecipeByName(query)
          .subscribe((recipes: any) => this.results.next(recipes.meals));
        break;
      case 'ingredient':
        this.recipes
          .getRecipeByIngredient(query)
          .subscribe((recipes: any) => this.results.next(recipes.meals));
        break;
      case 'category':
        this.recipes
          .getRecipeByCategory(query)
          .subscribe((recipes: any) => this.results.next(recipes.meals));
        break;
      default:
        break;
    }
  }
}
