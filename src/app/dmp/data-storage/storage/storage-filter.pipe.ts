import { Pipe, PipeTransform } from '@angular/core';
import {Storage} from '../../../domain/storage';

@Pipe({
  name: 'storageFilter'
})
export class StorageFilterPipe implements PipeTransform {

  transform(data: Storage[], selected: Storage[]) {
    return data.filter(item => !selected.find(entry => entry.title === item.title));
  }

}
