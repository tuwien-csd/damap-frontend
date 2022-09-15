import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Version} from '../../../domain/version';
import {DmpListItem} from '../../../domain/dmp-list-item';

@Component({
  selector: 'app-version-table',
  templateUrl: './version-table.component.html',
  styleUrls: ['./version-table.component.css']
})
export class VersionTableComponent {

  displayedColumns: string[] = ['version', 'name', 'date', 'revision'];

  @Input() dmp: DmpListItem;
  @Input() versions: Version[];
  @Output() versionToView = new EventEmitter<number>();

  constructor() {
  }

  viewVersion(revision: number) {
    this.versionToView.emit(revision);
  }
}
