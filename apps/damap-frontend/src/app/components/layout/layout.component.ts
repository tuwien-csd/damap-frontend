import {Component, OnInit} from '@angular/core';
import pkg from '../../../../../../package.json';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '@damap/core';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public title = 'Data Management Plan';
  public version: string = pkg.version;
  public name: string;
  public lang = 'EN';
  public widescreen = () => window.innerWidth >= 1024;

  readonly env: string;

  constructor(private auth: AuthService,
              private translate: TranslateService,
              private configService: ConfigService) {
    this.env = this.configService.getEnvironment();
  }

  ngOnInit(): void {
    this.name = this.auth.getName();
    const browserLang = this.translate.getBrowserLang();
    this.translate.use((browserLang.match(/en|de/) ? browserLang : 'en'));
    this.lang = this.translate.currentLang.toUpperCase();
  }

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }

  public logout() {
    this.auth.logout();
  }

}
