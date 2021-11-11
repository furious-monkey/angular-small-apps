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

  findResults(query: string) {
    this.recipes
      .getRecipeByName(query)
      .subscribe((recipes: any) => this.results.next(recipes.meals));
  }
}
