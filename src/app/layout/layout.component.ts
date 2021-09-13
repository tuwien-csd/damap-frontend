import {Component, OnInit} from '@angular/core';
import pkg from '../../../package.json';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public title = 'Data Management Plan';
  public version: string = pkg.version;
  public name: string;
  public widescreen = () => window.innerWidth >= 1024;

  constructor(private auth: OAuthService) {
    const claims = this.auth.getIdentityClaims();
    this.name = claims['name'];
  }

  ngOnInit() {
  }

  public logout() {
    this.auth.logOut();
  }

}
