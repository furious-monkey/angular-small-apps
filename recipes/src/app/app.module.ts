import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { FormatCommaPipe } from './shared/pipes/format-comma.pipe';
import { RecipeComponent } from './components/recipe/recipe.component';
import { SlugifyPipe } from './shared/pipes/slugify.pipe';

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
