import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { Recipes } from 'src/app/shared/recipes';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { RecipesService } from 'src/app/shared/services/recipes.service';

@Component({
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RecipeComponent implements OnInit {
  recipe: Partial<Recipes> = {};
  isEditable: boolean = false;
  savedRecipes: Recipes[] = this.storage.get('recipes');
  preview: string = this.recipe.strMealThumb!;

  constructor(
    private storage: LocalStorageService,
    private route: ActivatedRoute,
    private recipes: RecipesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.setRecipe(slug);
    this.preview = this.recipe.strMealThumb!;
  }

  setRecipe(slug: string): void {
    const allRecipes = this.storage.get('recipes');
    const filteredRecipes = allRecipes.filter(
      (meal: Recipes) => meal.slug === slug
    );

    if (filteredRecipes.length === 0) {
      const recipeId = history.state?.id;
      if (recipeId) {
        this.recipes.getRecipeById(recipeId).subscribe((recipes: any) => {
          this.recipe = recipes.meals[0];
          this.preview = this.recipe.strMealThumb!;
        });
      } else {
        this.router.navigateByUrl('/404');
      }
    } else {
      this.recipe = filteredRecipes[0] ? filteredRecipes[0] : {};
    }
  }

  getIngredients(): string[] {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const currentIngredient = `strIngredient${i}` as keyof Recipes;
      let ingredient;

      if (this.recipe[currentIngredient]) {
        const currentMeasure = `strMeasure${i}` as keyof Recipes;

        if (this.recipe[currentMeasure]) {
          ingredient = `${this.recipe[currentMeasure]} ${this.recipe[currentIngredient]}`;
        } else {
          ingredient = `${this.recipe[currentIngredient]}`;
        }
      }

      if (ingredient) ingredients.push(ingredient);
    }

    return ingredients;
  }

  isContentEditable(value: boolean): void {
    this.isEditable = value;
  }

  updateRecipe(e: any) {
    const recipeProperty = e.target.name as keyof Recipes;

    if (!recipeProperty) {
      return;
    }

    this.recipe[recipeProperty] = e.target.value;

    if (recipeProperty.startsWith('strIngredient')) {
      const ingredientNumber = recipeProperty.replace('strIngredient', '');
      const measureProperty = `strMeasure${ingredientNumber}` as keyof Recipes;
      this.recipe[measureProperty] = undefined;
    }

    const updatedRecipes = this.savedRecipes.map((recipe: Recipes) => {
      if (recipe.idMeal === this.recipe.idMeal) {
        return { ...this.recipe };
      }
      return recipe;
    });
    this.storage.set('recipes', updatedRecipes);
  }

  getPreview() {
    return this.preview;
  }

  getImage(img: any) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL('image/png');

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  updatePreview(e: any) {
    const newPreview = e.target.files[0];

    if (FileReader && newPreview) {
      const fileReader = new FileReader();
      fileReader.onload = (reader) => {
        if (reader.target?.result) {
          const updatedRecipes = this.savedRecipes.map((recipe: Recipes) => {
            if (recipe.idMeal === this.recipe.idMeal) {
              return { ...recipe, strMealThumb: reader.target?.result };
            }
            return recipe;
          });
          this.preview = reader.target?.result as string;
          this.storage.set('recipes', updatedRecipes);
        }
      };
      fileReader.readAsDataURL(newPreview);
    }
  }
}
