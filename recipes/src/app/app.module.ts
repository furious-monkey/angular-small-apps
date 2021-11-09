import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { FormatCommaPipe } from './shared/pipes/format-comma.pipe';
import { RecipeComponent } from './components/recipe/recipe.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SlugifyPipe } from './shared/pipes/slugify.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    FormatCommaPipe,
    RecipeComponent,
    SearchComponent,
    SearchResultsComponent,
    SlugifyPipe,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
