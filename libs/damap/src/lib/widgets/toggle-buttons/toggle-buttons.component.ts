import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-buttons',
  templateUrl: './toggle-buttons.component.html',
  styleUrls: ['./toggle-buttons.component.css'],
})
export class ToggleButtonsComponent {
  @Input() primaryLabel: string = '';
  @Input() secondaryLabel: string = '';
  @Output() selectionChange = new EventEmitter<
    'primaryView' | 'secondaryView'
  >();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  emitSelection(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
    this.selectionChange.emit(view);
  }

  isDisabled(view: 'primaryView' | 'secondaryView'): boolean {
    return this.selectedView === view;
  }
}
