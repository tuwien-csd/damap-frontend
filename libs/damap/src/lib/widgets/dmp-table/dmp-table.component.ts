import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { DmpListItem } from '../../domain/dmp-list-item';
import { FunctionRole } from '../../domain/enum/function-role.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingState } from '../../domain/enum/loading-state.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dmp-table',
  templateUrl: './dmp-table.component.html',
  styleUrls: ['./dmp-table.component.css'],
})
export class DmpTableComponent implements OnChanges, AfterViewInit {
  @Input() dmps: DmpListItem[];
  @Input() admin = false;
  @Input() dmpsLoaded: Observable<LoadingState>;
  dataSource = new MatTableDataSource();

  @Output() createDocument = new EventEmitter<number>();
  @Output() createJsonFile = new EventEmitter<number>();
  @Output() dmpToDelete = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchTerm: string = '';

  readonly tableHeaders: string[] = [
    'title',
    'created',
    'modified',
    'contact',
    'edit',
  ];
  readonly FUNCTION_ROLES = FunctionRole;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dmps) {
      this.dataSource.data = this.dmps;
    }
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (data: DmpListItem, filter: string) =>
      data.project?.title?.toLowerCase().includes(filter) ||
      data.title?.toLowerCase().includes(filter) ||
      data.id.toString().includes(filter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (
      item: DmpListItem,
      property: string,
    ) => {
      switch (property) {
        case 'title':
          return item.project?.title || 'DMP ID: ' + item.id;
        case 'contact':
          return item.contact?.firstName + ' ' + item.contact?.lastName;
        default:
          return item[property];
      }
    };
  }

  applyFilter(filterValue: string) {
    this.searchTerm = filterValue;
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

  deleteDmp(id: number) {
    this.dmpToDelete.emit(id);
  }

  protected readonly LoadingState = LoadingState;
}
