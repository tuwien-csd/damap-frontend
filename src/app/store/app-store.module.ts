import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {config, reducers} from './main';
import {environment} from '../../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ProjectEffects} from './effects/project.effects';
import {DmpEffects} from './effects/dmp.effects';
import {RepositoryEffects} from './effects/repository.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, config),
    EffectsModule.forRoot([DmpEffects, ProjectEffects, RepositoryEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})

export class AppStoreModule { }
