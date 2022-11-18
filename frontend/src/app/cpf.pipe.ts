import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CPF'
})
export class CPFPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    return 'error';
  }
}