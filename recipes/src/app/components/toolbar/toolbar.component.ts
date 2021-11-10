import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { slugify } from 'src/app/shared/utilities/slugify';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  recipeId = history.state?.id;
  savedRecipes: object[] = this.storage.get('recipes');
  isEditionEnabled: boolean = false;
  toggleLabel: string = 'Edition disabled';

  constructor(
    private storage: LocalStorageService,
    private recipes: RecipesService,
    private router: Router
  ) {}

  isSavedRecipe(): boolean {
    let recipeIndex;

    if (this.recipeId) {
      recipeIndex = this.savedRecipes.findIndex(
        (recipe: any) => recipe.idMeal === this.recipeId
      );
    } else {
      const slug = this.router.url.replace('/recipe/', '');
      recipeIndex = this.savedRecipes.findIndex(
        (recipe: any) => recipe.slug === slug
      );
    }

    return recipeIndex === -1 ? false : true;
  }

  shouldDisplaySave(): boolean {
    return !this.isSavedRecipe();
  }

  saveRecipe(): void {
    this.recipes.getRecipeById(this.recipeId).subscribe((recipe: any) => {
      const currentRecipe = recipe.meals[0];
      const newRecipe = {
        ...currentRecipe,
        slug: slugify(currentRecipe.strMeal),
      };
      this.savedRecipes.push(newRecipe);
      this.storage.set('recipes', this.savedRecipes);
    });
  }

  toggleEdition() {
    this.isEditionEnabled = !this.isEditionEnabled;
    this.toggleLabel = this.isEditionEnabled
      ? 'Edition enabled'
      : 'Edition disabled';
  }
}
