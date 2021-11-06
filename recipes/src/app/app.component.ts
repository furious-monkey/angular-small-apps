import { Component, OnInit } from '@angular/core';
import { Recipes } from './shared/recipes';
import { LocalStorageService } from './shared/services/local-storage.service';
import { RecipesService } from './shared/services/recipes.service';
import { slugify } from './shared/utilities/slugify';

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
      const recipesArray = recipes.meals;
      const newRecipesArray = recipesArray.map((recipe: Recipes) => {
        return {...recipe, slug: slugify(recipe.strMeal)}
      })
      this.localStorage.set('recipes', newRecipesArray);
    });
  }
}
