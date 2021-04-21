import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byte'
})
export class BytePipe implements PipeTransform {

  transform(value: number): string {
    if(value <= 0) {
      return 'Unkown';
    }
    if(value <= 1000000) {
      return '< ' + (value/1000).toFixed(2) + ' KB';
    }
    if(value <= 1000000000) {
      return '< ' + (value/1000000).toFixed(2) + ' MB';
    }
    if(value <= 1000000000000) {
      return '< ' + (value/1000000000).toFixed(2) + ' GB';
    }
    if(value <= 1000000000000000) {
      return '< ' + (value/1000000000000).toFixed(2) + ' TB';
    }
    return '> 1 PB';
  }

}
