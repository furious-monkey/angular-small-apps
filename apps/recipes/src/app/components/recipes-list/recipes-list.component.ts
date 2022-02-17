import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipes } from 'src/app/shared/recipes';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { slugify } from 'src/app/shared/utilities/slugify';

@Component({
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  private _recipes = new BehaviorSubject<Recipes[]>([]);
  public recipes = this._recipes.asObservable();

  constructor(
    private storage: LocalStorageService,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    if (this.storage.get('recipes')) {
      this._recipes.next(this.storage.get('recipes'));
    } else {
      this.setRecipes();
      this.saveRecipes();
    }
  }

  setRecipes(): any {
    this.recipesService.getAllRecipes().subscribe((recipes: any) => {
      const allRecipes: Recipes[] = recipes.meals;
      const allRecipesWithSlug = allRecipes.map((recipe: Recipes) => {
        return { ...recipe, slug: slugify(recipe.strMeal) };
      });
      this._recipes.next(allRecipesWithSlug);
    });
  }

  saveRecipes(): void {
    this.recipes.subscribe((recipes) => this.storage.set('recipes', recipes));
  }
}
