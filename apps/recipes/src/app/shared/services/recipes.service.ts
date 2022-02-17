import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipes } from '../recipes';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private allRecipesAPI =
    'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
  private recipeByIdAPI =
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  private recipeByNameAPI =
    'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  private recipeByIngredientAPI =
    'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  private recipeByCategoryAPI =
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.allRecipesAPI);
  }

  getRecipeById(id: number): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.recipeByIdAPI + id);
  }

  getRecipeByName(name: string): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.recipeByNameAPI + name);
  }

  getRecipeByIngredient(ingredient: string): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.recipeByIngredientAPI + ingredient);
  }

  getRecipeByCategory(category: string): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.recipeByCategoryAPI + category);
  }
}
