import {Component, OnInit} from '@angular/core';
import pkg from '../../../package.json';
import {OAuthService} from 'angular-oauth2-oidc';
import {TranslateService} from '@ngx-translate/core';

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

  constructor(private auth: OAuthService, private translate: TranslateService) {
    const claims = this.auth.getIdentityClaims();
    this.name = claims['name'];
  }

  ngOnInit() {
  }

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }

  public logout() {
    this.auth.logOut();
  }

}
