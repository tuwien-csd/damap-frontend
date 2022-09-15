import {NgModule} from '@angular/core';
import {BytePipe} from './byte.pipe';

@NgModule({
  declarations: [BytePipe],
  exports: [BytePipe]
})
export class ByteModule{}
