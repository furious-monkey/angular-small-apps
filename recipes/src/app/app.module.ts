import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { FormatCommaPipe } from './format-comma.pipe';
import { RecipeComponent } from './recipe/recipe.component';
import { SlugifyPipe } from './slugify.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    FormatCommaPipe,
    RecipeComponent,
    SlugifyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
