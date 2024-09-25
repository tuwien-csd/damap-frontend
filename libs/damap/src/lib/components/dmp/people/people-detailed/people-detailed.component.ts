import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-people-detailed',
  templateUrl: './people-detailed.component.html',
})
export class PeopleDetailedComponent implements OnInit {
  @Output() selectionChange = new EventEmitter<
    'primaryView' | 'secondaryView'
  >();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  ngOnInit(): void {
    this.emitSelection('primaryView');
  }

  emitSelection(view: 'primaryView' | 'secondaryView'): void {
    this.selectionChange.emit(view);
  }

  onViewChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
  }
}
