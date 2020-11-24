import {Component, Input, OnInit} from '@angular/core';
import {Dmp} from '../domain/dmp';
import {MatTableDataSource} from '@angular/material/table';
import {BackendService} from '../services/backend.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-plan',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlansComponent implements OnInit {

  @Input() public userDmps: Dmp[] = [];
  dataSource = new MatTableDataSource();

  readonly tableHeaders: string[] = ['title', 'created', 'modified', 'edit','history', 'remove'];
  expandedElement: Dmp | null;

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.getDmps();
    this.dataSource.data = this.userDmps;
  }

  removeDmp(dmp: Dmp) {
    // todo
  }

  private getDmps() {
    this.backendService.getDmps()
      .subscribe(dmps => this.userDmps = dmps);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
