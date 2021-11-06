import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipes } from '../recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private allRecipesAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
  private recipeByIdAPI = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.allRecipesAPI);
  }

  getRecipeById(id: number): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.recipeByIdAPI + id);
  }
}
