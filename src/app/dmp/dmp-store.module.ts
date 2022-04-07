import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {ProjectEffects} from '../store/effects/project.effects';
import {EffectsModule} from '@ngrx/effects';
import {InternalStorageEffects} from '../store/effects/internal-storage.effects';
import {DmpEffects} from '../store/effects/dmp.effects';
import {RepositoryEffects} from '../store/effects/repository.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {config, reducers} from '../store/main';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('dmp', reducers, config),
    EffectsModule.forFeature([DmpEffects, ProjectEffects, InternalStorageEffects, RepositoryEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})

export class DmpStoreModule { }
