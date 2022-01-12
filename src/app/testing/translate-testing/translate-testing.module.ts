import {Injectable, NgModule, Pipe, PipeTransform} from '@angular/core';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

@Pipe({
  name: 'translate'
})
export class TranslatePipeMock implements PipeTransform {
  public name = 'translate';

  public transform(value: string): string {
    return value;
  }
}

@Injectable()
export class TranslateServiceStub {
  public get<T>(key: T): Observable<T> {
    return of(key);
  }
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
    })
  ],
  declarations: [
    TranslatePipeMock
  ],
  providers: [
    { provide: TranslateService, useValue: TranslateServiceStub },
    { provide: TranslatePipe, useClass: TranslatePipeMock }
  ],
  exports: [
    TranslatePipeMock
  ]
})
export class TranslateTestingModule {
}
