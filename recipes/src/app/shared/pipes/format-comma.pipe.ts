import { Pipe, PipeTransform } from '@angular/core';

/*
 * Add a space after a comma.
 * Usage:
 *   text | formatComma
 * Example:
 *   {{ foo,bar,baz | formatComma }}
 *   formats to: foo, bar, baz
 */
@Pipe({
  name: 'formatComma',
})
export class FormatCommaPipe implements PipeTransform {
  transform(text: string): string {
    return text.replace(/,/g, ', ');
  }
}
