import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DmpListItem} from '../../domain/dmp-list-item';

@Component({
  selector: 'app-dmp-table',
  templateUrl: './dmp-table.component.html',
  styleUrls: ['./dmp-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DmpTableComponent implements OnInit {

  @Input() dmps: DmpListItem[];
  dataSource = new MatTableDataSource();

  @Output() createDocument = new EventEmitter<number>();
  @Output() createJsonFile = new EventEmitter<number>();

  readonly tableHeaders: string[] = ['title', 'created', 'modified', 'edit', 'history', 'remove'];
  expandedElement: DmpListItem | null;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = this.dmps;
  }

  // TODO: Filter doesn't work with nested fields (project title)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDocument(id: number) {
    this.createDocument.emit(id);
  }

  getJsonFile(id: number) {
    this.createJsonFile.emit(id);
  }

}
