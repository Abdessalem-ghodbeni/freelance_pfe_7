import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commande',
})
export class CommandePipe implements PipeTransform {
  transform(value: any[], term: string): any[] {
    if (!term) {
      return value;
    } else {
      return value.filter((item) => item.id.toString().includes(term));
    }
  }
}
