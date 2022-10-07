import {Component, Input} from '@angular/core';
import {Storage} from '../../../../domain/storage';
import {Dataset} from '../../../../domain/dataset';
import {ExternalStorage} from '../../../../domain/external-storage';
import {Host} from '../../../../domain/host';

@Component({
  selector: 'app-version-view-storages',
  templateUrl: './version-view-storages.component.html',
  styleUrls: ['./version-view-storages.component.css']
})
export class VersionViewStoragesComponent {

  @Input() storages: Storage[];
  @Input() externalStorages: ExternalStorage[];
  @Input() datasets: Dataset[];

  constructor() {
  }

  getDatasetsForStorage(storage: Host): Dataset[] {
    return this.datasets.filter(item => storage.datasets.includes(item.referenceHash));
  }

}
