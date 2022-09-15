import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatasetSourcePipe} from './dataset-source.pipe';


@NgModule({
  declarations: [
    DatasetSourcePipe
  ],
  exports: [
    DatasetSourcePipe
  ],
  imports: [
    CommonModule
  ]
})
export class DatasetSourceModule {
}
