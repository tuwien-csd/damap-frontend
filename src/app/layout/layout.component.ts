import {Component, OnInit} from '@angular/core';
import pkg from '../../../package.json';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../auth/auth.service';

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

  constructor(private auth: AuthService, private translate: TranslateService) {
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
