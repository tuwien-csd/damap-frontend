import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public title:string = 'Data Management Plan';

  constructor(private auth:KeycloakService) { }

  ngOnInit() { }

  public logout() {
    this.auth.logout();
  }

}
