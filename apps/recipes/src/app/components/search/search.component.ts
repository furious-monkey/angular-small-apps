import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: '.search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchForm = this.formBuilder.group({
    by: 'name',
    query: '',
  });

  constructor(
    private search: SearchService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit(): void {
    const by = this.searchForm.get('by')?.value;
    const query = this.searchForm.get('query')?.value;
    this.search.findResults(query, by);
    this.router.navigate([`/search`, { by, query }]);
  }
}
