import { Component, OnInit } from '@angular/core';
import { Meals } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipe: Partial<Meals> = {};

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    const recipeId = history.state.id || 0;
    this.getRecipe(recipeId);
  }

  getRecipe(id: number): void {
    if (id) this.recipeService.getRecipe(id).subscribe((recipe: any) => {
      this.recipe = recipe.meals[0];
    });
  }

  getIngredients(): string[] {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const currentMeasure = `strMeasure${i}` as keyof Meals;
      const currentIngredient = `strIngredient${i}` as keyof Meals;
      const ingredient = this.recipe[currentIngredient] ? `${this.recipe[currentMeasure]} ${this.recipe[currentIngredient]}` : '';
      if (ingredient) ingredients.push(ingredient);
    }

    return ingredients;
  }

}
