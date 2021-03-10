import { Pipe, PipeTransform } from '@angular/core';
import {TuStorage} from './storage-list';

@Pipe({
  name: 'storageFilter'
})
export class StorageFilterPipe implements PipeTransform {

  transform(data: TuStorage[], selected: {service: TuStorage, datasets: string[]}[]) {
    return data.filter(item => !selected.find(entry => entry.service.id === item.id));
  }

}
