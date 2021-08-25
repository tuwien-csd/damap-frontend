import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public token:object;
  public name:string;
  public username:string;
  public roles:string[];

  constructor(private auth: OAuthService) {}

  ngOnInit() {
    console.log('Dashboard component loaded.');
    const claims = this.auth.getIdentityClaims();
    this.name = claims['name'];
    this.roles = claims['groups'];
    this.username = claims['preferred_username'];
  }

}
