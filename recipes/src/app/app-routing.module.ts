import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  { path: '', component: RecipesListComponent},
  { path: 'recipe/:slug', component: RecipeComponent},
  { path: 'search/:query', component: SearchResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
