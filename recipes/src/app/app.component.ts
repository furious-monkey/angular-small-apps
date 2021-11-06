import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/services/local-storage.service';
import { RecipesService } from './shared/services/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Food Recipes';

  constructor(private recipesService: RecipesService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    if (!this.localStorage.get('recipes')) {
      this.saveRecipes();
    }
  }

  saveRecipes(): void {
    this.recipesService.getAllRecipes().subscribe((recipes: any) => {
      this.localStorage.set('recipes', recipes.meals);
    });
  }
}
