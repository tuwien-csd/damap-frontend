import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {config, reducers} from './main';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ProjectEffects} from './effects/project.effects';
import {DmpEffects} from './effects/dmp.effects';
import {RepositoryEffects} from './effects/repository.effects';
import {InternalStorageEffects} from './effects/internal-storage.effects';
import {APP_ENV} from '../constants';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('damap', reducers, config),
    EffectsModule.forFeature([DmpEffects, ProjectEffects, InternalStorageEffects, RepositoryEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: APP_ENV.production}),
  ]
})

export class DamapStoreModule {
}
