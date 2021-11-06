import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getRecipe(id: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeUrl + id);
  }
}
