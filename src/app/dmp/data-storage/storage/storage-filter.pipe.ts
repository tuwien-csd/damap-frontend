import { Pipe, PipeTransform } from '@angular/core';
import {Storage} from '../../../domain/storage';

@Pipe({
  name: 'storageFilter'
})
export class StorageFilterPipe implements PipeTransform {

  transform(data: Storage[], selected: {id: string, datasets: string[]}[]) {
    return data.filter(item => !selected.find(entry => entry.id === item.id));
  }

}
