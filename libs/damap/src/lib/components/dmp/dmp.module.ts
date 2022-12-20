import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { AccessComponent } from "../access/access.component";
import { CommonModule } from "@angular/common";
import { CostsModule } from "./costs/costs.module";
import { DMP_ROUTES } from "./dmp.routes";
import { DataDeletionModule } from "./data-deletion/data-deletion.module";
import { DataStorageModule } from "./data-storage/data-storage.module";
import { DmpActionsModule } from "./dmp-actions/dmp-actions.module";
import { DmpComponent } from "./dmp.component";
import { DocDataQualityModule } from "./doc-data-quality/doc-data-quality.module";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { LegalEthicalAspectsModule } from "./legal-ethical-aspects/legal-ethical-aspects.module";
import { LicensesModule } from "./licenses/licenses.module";
import { MatStepperModule } from "@angular/material/stepper";
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import { NgModule } from "@angular/core";
import { PeopleModule } from "./people/people.module";
import { ProjectModule } from "./project/project.module";
import { RepoModule } from "./repo/repo.module";
import { ReuseModule } from "./reuse/reuse.module";
import { RouterModule } from "@angular/router";
import { SpecifyDataModule } from "./specify-data/specify-data.module";
import { SummaryModule } from "./summary/summary.module";
import { VersionModule } from "../version/version.module";

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/damap-core/i18n/", suffix: ".json" },
    { prefix: "./assets/damap-core/i18n/access/", suffix: ".json" },
    { prefix: "./assets/damap-core/i18n/templates/", suffix: ".json" },
    { prefix: "./assets/damap-core/i18n/help/", suffix: ".json" },
    { prefix: "./assets/damap-core/i18n/info/", suffix: ".json" },
    { prefix: "./assets/i18n/", suffix: ".json" }
  ]);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DMP_ROUTES),
    FormsModule,
    TranslateModule.forChild({
      defaultLanguage: "en",
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      isolate: true,
      extend: true
    }),
    VersionModule,
    AccessComponent,

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
    DmpActionsModule
  ],
  declarations: [DmpComponent]
})
export class DmpModule {
}
