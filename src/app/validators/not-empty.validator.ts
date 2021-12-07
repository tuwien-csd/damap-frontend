import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/** Value cannot be empty */
export function notEmptyValidator(): ValidatorFn {
  console.log('check trim');
  return (control: AbstractControl): ValidationErrors | null => {
    const empty = (control.value || '').trim().length === 0;
    return empty ? {empty} : null;
  };
}
