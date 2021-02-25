import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Dmp} from '../../domain/dmp';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  @Input() dmps: Dmp[];
  dataSource = new MatTableDataSource();

  readonly tableHeaders: string[] = ['title', 'created', 'modified', 'edit', 'history', 'remove'];
  expandedElement: Dmp | null;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = this.dmps;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
