import { Pipe, PipeTransform } from '@angular/core';

/*
 * Transform a string to a slug.
 * Usage:
 *   text | slugify
 * Example:
 *   {{ Foo bar, baz | slugify }}
 *   formats to: foo-bar-baz
*/
@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {

  transform(text: string): string {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-|-$/g, "");
  }

}
