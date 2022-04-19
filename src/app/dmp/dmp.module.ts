import {NgModule} from '@angular/core';
import {DmpComponent, SaveVersionDialogComponent} from './dmp.component';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MatStepperModule} from '@angular/material/stepper';
import {RouterModule} from '@angular/router';
import {ReuseModule} from './reuse/reuse.module';
import {SummaryModule} from './summary/summary.module';
import {SaveStatusModule} from '../widgets/save-status/save-status.module';
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
import {DMP_ROUTES} from './dmp.routes';
import {DmpStoreModule} from './dmp-store.module';
import {VersionModule} from '../version/version.module';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/templates/', suffix: '.json'},
    {prefix: './assets/i18n/help/', suffix: '.json'},
    {prefix: './assets/i18n/info/', suffix: '.json'}
  ]);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DMP_ROUTES),
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]},
      isolate: true,
      extend: true
    }),
    DmpStoreModule,
    VersionModule,

    // Widgets
    SaveStatusModule,

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
  ],
  declarations: [DmpComponent, SaveVersionDialogComponent]
})
export class DmpModule {
}
