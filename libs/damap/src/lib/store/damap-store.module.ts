import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {config, reducers} from './main';
// import {environment} from '../../../../../apps/damap-frontend/src/environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ProjectEffects} from './effects/project.effects';
import {DmpEffects} from './effects/dmp.effects';
import {RepositoryEffects} from './effects/repository.effects';
import {InternalStorageEffects} from './effects/internal-storage.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('damap', reducers, config),
    EffectsModule.forFeature([DmpEffects, ProjectEffects, InternalStorageEffects, RepositoryEffects]),
    // StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}), FIXME
    StoreDevtoolsModule.instrument()
  ]
})

export class DamapStoreModule {
}
