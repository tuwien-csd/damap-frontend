import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {CostType} from '../../domain/enum/cost-type.enum';

@Component({
  selector: 'app-dmp-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent {

  @Input() costsStep: FormGroup;

  @Output() costToAdd = new EventEmitter();
  @Output() costToRemove = new EventEmitter<number>();

  @Output() crisValueChange = new EventEmitter<string>();

  costType: any = CostType;

  translateEnumPrefix = 'enum.costs.'

  constructor() {
  }

  get list() {
    return this.costsStep?.get('list') as FormArray;
  }

  getFormControl(index: number, controlName: string): FormControl {
    return (this.list.at(index) as FormGroup)?.controls[controlName] as FormControl;
  }

  addCost() {
    this.costToAdd.emit();
  }

  removeCost(index: number) {
    this.costToRemove.emit(index);
  }

  changeCrisValue(controlName: string) {
    this.crisValueChange.emit('costs.' + controlName)
  }
}
