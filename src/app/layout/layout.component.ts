import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public title:string = 'Data Management Plan';
  public token:object;
  public name:string;
  public username:string;
  public roles:string[];

  constructor(private auth:KeycloakService) { }

  ngOnInit() {
    this.token = this.auth.getToken();
    this.auth.loadUserProfile().then(p => this.name = `${p.firstName} ${p.lastName}`);
    this.username = this.auth.getUsername();
    this.roles = this.auth.getUserRoles(true);
  }

  public logout() {
    this.auth.logout();
  }

  public widescreen(): boolean {
    return window.innerWidth >= 1024;
  }

}
