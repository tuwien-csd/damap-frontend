import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  public title = 'Data Management Plan';
  public version: string = pkg.version;
  public name: string;
  public lang = 'en';
  public isSmallScreen: boolean = false;
  public isCollapsed: boolean = false;

  readonly env: string;

  constructor(
    private auth: AuthService,
    private translate: TranslateService,
    private configService: ConfigService,
    private observer: BreakpointObserver,
  ) {
    this.env = this.configService.getEnvironment();
  }

  ngOnInit(): void {
    this.name = this.auth.getUsername();
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');
    this.lang = this.translate.currentLang.toUpperCase();

    this.observer.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
      this.checkScreenSize();
    });
  }

  ngAfterViewInit(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isCollapsed = this.isSmallScreen;
  }

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }

  public logout(): void {
    this.auth.logout();
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
