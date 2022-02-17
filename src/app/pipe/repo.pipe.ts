import {Pipe, PipeTransform} from '@angular/core';
import {Host} from '../domain/host';
import {Repository} from '../domain/repository';

@Pipe({
  name: 'repo'
})
export class RepoPipe implements PipeTransform {

  transform(repos: Repository[], selected: Host[]): Repository[] {
    return repos.filter(e => selected.find(entry => entry.hostId === e.id) === undefined);
  }

}
