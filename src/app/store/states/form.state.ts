import {Dmp} from '../../domain/dmp';

export interface FormState {
  dmp: Dmp;
  changed: boolean;
}
export const initialFormState: FormState = {
  dmp: null,
  changed: false
};
