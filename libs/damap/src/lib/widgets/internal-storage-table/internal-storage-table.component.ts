import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalStorage } from '../../domain/internal-storage';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'damap-internal-storage-table',
  templateUrl: './internal-storage-table.component.html',
  styleUrls: ['./internal-storage-table.component.css'],
})
export class InternalStorageTableComponent implements AfterViewInit, OnChanges {


  constructor(
    private backendService: BackendService,
  ) { }

  @Input() internalStorages: InternalStorage[] =  [
    {
      id: 1,
      url: 'https://www.google.com',
      storageLocation: 'local',
      backupLocation: 'local',
      translations: [],
      active: true,
    },
    {
      id: 2,
      url: 'https://www.google.com',
      storageLocation: 'local',
      backupLocation: 'local',
      translations: [],
      active: true
    },
  ];
  dataSource = new MatTableDataSource<InternalStorage>();

  readonly tableHeaders: string[] = [
    'url',
    'storageLocation',
    'backupLocation',
    'active',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.internalStorages) {
      this.dataSource.data = this.internalStorages;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: InternalStorage, filter: string) =>
      data.url?.toLowerCase().includes(filter.trim().toLowerCase());
  }

  toggleActivation(id: number) {
    const storage = this.internalStorages.find(s => s.id === id);
    const storageCopy = { ...storage };
    storageCopy.active = !storage.active;
    this.backendService.updateInternalStorage(storageCopy).subscribe(() => {
      this.internalStorages = this.internalStorages.map(s => (s.id === id ? storageCopy : s));
      this.dataSource.data = this.internalStorages;
    });
  }
}
