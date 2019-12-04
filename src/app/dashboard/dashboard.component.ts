import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public token:string;
  public name:string;
  public username:string;
  public expiresAt:Date;
  public roles:string[];

  constructor(private auth:AuthService) {}

  ngOnInit() {
    this.token = this.auth.getToken();
    this.name = this.auth.getName();
    this.username = this.auth.getUsername();
    this.roles = this.auth.getRoles();
    this.expiresAt = this.auth.getExpiresAt();
    console.log("Dashboard component loaded.");
  }

  refresh() {
    this.token = this.auth.getToken();
    this.expiresAt = this.auth.getExpiresAt();
  }

}
