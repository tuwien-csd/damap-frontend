import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Consent} from '../../domain/consent'

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})

export class ConsentComponent {
  public lang = 'EN';
  public consent: Consent;

  constructor(private translate: TranslateService) {
  }

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }
}
