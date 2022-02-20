import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipses',
})
export class EllipsesPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value.length > 55) {
      return value.substring(0, 55) + ' ...';
    }
    return value;
  }
}
