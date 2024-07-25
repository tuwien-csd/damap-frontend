import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

import { AuthService } from '@damap/core';
import { ConfigService } from '../../services/config.service';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import pkg from '../../../../../../package.json'; // eslint-disable-line

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  public title = 'Data Management Plan';
  public version: string = pkg.version;
  public name: string;
  public lang = 'en';
  public isSmallScreen: boolean = false;

  readonly env: string;

  constructor(
    private auth: AuthService,
    private translate: TranslateService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
  ) {
    this.env = this.configService.getEnvironment();
  }

  ngOnInit(): void {
    this.name = this.auth.getName();
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');
    this.lang = this.translate.currentLang.toUpperCase();
  }

  ngAfterViewInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1024;
    if (this.isSmallScreen) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
    this.cdr.detectChanges();
  }

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }

  public logout() {
    this.auth.logout();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
