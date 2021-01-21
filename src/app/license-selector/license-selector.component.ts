import {Component, OnInit, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import 'lodash';
import '../../../node_modules/LicenseSelector/license-selector.js';

declare var $: any

@Component({
  selector: 'app-license-selector',
  templateUrl: './license-selector.component.html',
  styleUrls: ['./license-selector.component.css',
    '../../../node_modules/LicenseSelector/license-selector.css']
})
export class LicenseSelectorComponent implements OnInit, AfterViewInit {

  @Input() reference: string;
  @Output() licenseSelection = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const self = this;
    const id = this.reference;
    $(function () {
      $('#ref_' + id).licenseSelector({
        showLabels: true,
        onLicenseSelected(license) {
          self.licenseSelection.emit(license.url);
        }
      });
    });
  }

}
