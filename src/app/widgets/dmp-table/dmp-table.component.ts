import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DmpListItem} from '../../domain/dmp-list-item';
import {MatPaginator} from '@angular/material/paginator';

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
export class DmpTableComponent implements OnChanges, AfterViewInit {

  @Input() dmps: DmpListItem[];
  dataSource = new MatTableDataSource();

  @Output() createDocument = new EventEmitter<number>();
  @Output() createJsonFile = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  readonly tableHeaders: string[] = ['title', 'created', 'modified', 'contact', 'edit', 'history', 'remove'];
  expandedElement: DmpListItem | null;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dmps) {
      this.dataSource.data = this.dmps;
    }
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (data: DmpListItem, filter: string) =>
      data.project?.title?.toLowerCase().includes(filter)
      || data.title?.toLowerCase().includes(filter)
      || data.id.toString().includes(filter);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDocument(id: number) {
    this.createDocument.emit(id);
  }

  getJsonFile(id: number) {
    this.createJsonFile.emit(id);
  }

}
