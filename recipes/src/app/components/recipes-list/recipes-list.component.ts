import { Component, OnInit } from '@angular/core';
import { RecipesList } from './recipes-list';
import { RecipesService } from './recipes-list.service';

@Component({
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: RecipesList[] = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipesService.getRecipes()
    .subscribe((recipes: any) => {
      this.recipes = recipes.meals;
    });
  }
}
