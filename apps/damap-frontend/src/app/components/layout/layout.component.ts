import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AuthService } from '@damap/core';
import { ConfigService } from '../../services/config.service';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import pkg from '../../../../../../package.json'; // eslint-disable-line
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DmpComponent } from '../../../../../../libs/damap/src/lib/components/dmp/dmp.component'; // eslint-disable-line
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import * as layoutTemplate from '../../../assets/i18n/layout/en.json';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('outlet') outlet: RouterOutlet;

  private routerEventsSubscription: Subscription;
  public title = 'Data Management Plan';
  public version: string = pkg.version;
  public name: string;
  public lang = 'en';
  public isSmallScreen: boolean = false;
  public isCollapsed: boolean = false;
  public templateDataLayout = layoutTemplate;
  public icon = 'info';
  public infoString: BehaviorSubject<any> | null;
  private dataInfoService: Subscription | null = null;
  public greeting: string;
  public instructions: string;
  public summaryLine: string;
  public isIntroShow: boolean = true;

  readonly env: string;

  constructor(
    private auth: AuthService,
    private translate: TranslateService,
    private configService: ConfigService,
    private observer: BreakpointObserver,
    private router: Router,
  ) {
    this.env = this.configService.getEnvironment();
  }

  ngOnInit(): void {
    this.name = this.auth.getName();
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');
    this.lang = this.translate.currentLang.toUpperCase();
    this.observer.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
      this.checkScreenSize();
      this.handleRouteChange();
    });
  }

  ngAfterViewInit(): void {
    this.routerEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.handleRouteChange();
      });
    this.handleRouteChange();
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
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

  private handleRouteChange(): void {
    if (this.outlet && this.outlet.isActivated) {
      const componentInstance = this.outlet.component;
      if (componentInstance instanceof DmpComponent) {
        const dmpComponent = componentInstance as DmpComponent;
        this.infoString = dmpComponent.instructionStep$;
        this.dataInfoService = dmpComponent.instructionStep$.subscribe(
          value => {
            this.greeting = this.replaceFirstname(this.name, value.greeting);
            this.summaryLine = value.summaryLine;
          },
        );
      } else {
        this.greeting =
          this.templateDataLayout.layout.menu.greeting +
          ' ' +
          this.name +
          ' ' +
          this.templateDataLayout.layout.menu.titleDashboard;
        this.summaryLine = 'layout.menu.section';
      }
    }
  }
  replaceFirstname(name: string, str: string): string {
    const regex = new RegExp(`\\b${'Firstname'}\\b`, 'g');
    if (regex.test(str)) {
      return str.replace(regex, name);
    } else {
      return str;
    }
  }
}
