import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Contributor } from '../../domain/contributor';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: [],
})
export class PersonSearchComponent {
  @Input() result: Contributor[];
  @Output() termToSearch = new EventEmitter<string>();
  @Output() personToAdd = new EventEmitter<Contributor>();

  currentSearchTerm: string;

  search(term: string) {
    if (term.trim()) {
      this.termToSearch.emit(term);
    }
    this.currentSearchTerm = term;
  }

  selectPerson(person: Contributor) {
    this.personToAdd.emit(person);
  }
}
