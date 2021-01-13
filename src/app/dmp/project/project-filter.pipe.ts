import { Pipe, PipeTransform } from '@angular/core';
import {Project} from '../../domain/project';
@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(data: Project[], searchText: string) {
    if (searchText == null || data == null) {
      return data;
    }
    return data.filter(item => item.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

  }

}
