import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Contributor } from '../../domain/contributor';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css'],
})
export class PersonSearchComponent {
  @Input() result: Contributor[] = [];
  @Output() termToSearch = new EventEmitter<string>();
  @Output() personToAdd = new EventEmitter<Contributor>();

  currentSearchTerm: string = '';

  search(term: string) {
    this.currentSearchTerm = term.trim();
    if (this.currentSearchTerm) {
      this.termToSearch.emit(this.currentSearchTerm);
    } else {
      this.termToSearch.emit('');
      this.result = [];
    }
  }

  selectPerson(person: Contributor) {
    this.personToAdd.emit(person);
  }
}
