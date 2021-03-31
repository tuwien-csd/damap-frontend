import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byte'
})
export class BytePipe implements PipeTransform {

  transform(value: number): string {
    if(value <= 0) {
      return 'Unkown';
    }
    if(value <= 1000000000) {
      return '< ' + value/1000000 + ' MB';
    }
    if(value <= 1000000000000) {
      return '< ' + value/1000000000 + ' GB';
    }
    if(value <= 1000000000000000) {
      return '< ' + value/1000000000000 + ' TB';
    }
    return '> 1 PB';
  }

}
