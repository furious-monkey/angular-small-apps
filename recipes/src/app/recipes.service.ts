import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Recipes } from './recipes';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.recipesUrl)
  }
}
