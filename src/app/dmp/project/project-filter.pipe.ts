import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(data: any[], searchText: string) {
    if (searchText == null || data == null) {
      return data;
    }
    return data.filter(item => item.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

  }

}
