import {NgModule} from '@angular/core';
import {DmpComponent} from './dmp.component';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MatStepperModule} from '@angular/material/stepper';
import {ReuseModule} from './reuse/reuse.module';
import {SummaryModule} from './summary/summary.module';
import {CostsModule} from './costs/costs.module';
import {DataDeletionModule} from './data-deletion/data-deletion.module';
import {DataStorageModule} from './data-storage/data-storage.module';
import {DocDataQualityModule} from './doc-data-quality/doc-data-quality.module';
import {LegalEthicalAspectsModule} from './legal-ethical-aspects/legal-ethical-aspects.module';
import {LicensesModule} from './licenses/licenses.module';
import {PeopleModule} from './people/people.module';
import {ProjectModule} from './project/project.module';
import {RepoModule} from './repo/repo.module';
import {SpecifyDataModule} from './specify-data/specify-data.module';
import {HttpClient} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {VersionModule} from '../version/version.module';
import {FormsModule} from '@angular/forms';
import {DmpActionsModule} from './dmp-actions/dmp-actions.module';
import {RouterModule} from '@angular/router';
import {DMP_ROUTES} from './dmp.routes';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/damap-core/i18n/', suffix: '.json'},
    {prefix: './assets/damap-core/i18n/templates/', suffix: '.json'},
    {prefix: './assets/damap-core/i18n/help/', suffix: '.json'},
    {prefix: './assets/damap-core/i18n/info/', suffix: '.json'},
    {prefix: './assets/i18n/', suffix: '.json'}
  ]);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DMP_ROUTES),
    FormsModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]},
      isolate: true,
      extend: true
    }),
    VersionModule,

    // Steps
    ProjectModule,
    PeopleModule,
    SpecifyDataModule,
    DocDataQualityModule,
    LegalEthicalAspectsModule,
    DataStorageModule,
    LicensesModule,
    DataDeletionModule,
    RepoModule,
    ReuseModule,
    CostsModule,
    SummaryModule,

    // Materials
    MatStepperModule,
    DmpActionsModule,
  ],
  declarations: [DmpComponent]
})
export class DmpModule {
}
