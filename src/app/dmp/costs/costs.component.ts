import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {CostType} from '../../domain/enum/cost-type.enum';

@Component({
  selector: 'app-dmp-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {

  @Input() costsStep: FormGroup;

  @Output() costToAdd = new EventEmitter();
  @Output() costToRemove = new EventEmitter<number>();

  costType: any = CostType;
  fairLink = 'https://www.tuwien.at/en/research/rti-support/research-data/research-data-management/fair-principles';

  constructor() {
  }

  ngOnInit(): void {
  }

  get list() {
    return this.costsStep.get('list') as FormArray;
  }

  addCost() {
    this.costToAdd.emit();
  }

  removeCost(index: number) {
    this.costToRemove.emit(index);
  }

  openExternalLink() {
    window.open(this.fairLink, '_blank');
  }
}
