import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

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

  constructor(private auth:KeycloakService) {}

  ngOnInit() {
    this.token = this.auth.getToken();
    this.auth.loadUserProfile().then(p => this.name = `${p.firstName} ${p.lastName}`);
    this.username = this.auth.getUsername();
    this.roles = this.auth.getUserRoles(true);
    console.log("Dashboard component loaded.");
  }

}
