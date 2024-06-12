import { Component, OnInit } from '@angular/core';

import { AuthService } from '@damap/core';
import { ConfigService } from '../../services/config.service';
import { TranslateService } from '@ngx-translate/core';
import pkg from '../../../../../../package.json'; // eslint-disable-line

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  public title = 'Data Management Plan';
  public version: string = pkg.version;
  public name: string;
  public lang = 'EN';
  public widescreen = () => window.innerWidth >= 1024;

  readonly env: string;

  constructor(
    private auth: AuthService,
    private translate: TranslateService,
    private configService: ConfigService,
  ) {
    this.env = this.configService.getEnvironment();
  }

  ngOnInit(): void {
    this.name = this.auth.getName();
  }

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }

  public logout() {
    this.auth.logout();
  }
}
