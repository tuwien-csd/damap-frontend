import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../../environments/environment';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule,
    EffectsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})

export class DmpStoreModule {
}
