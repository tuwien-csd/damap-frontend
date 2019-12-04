import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Data Management Plan';

  public isAuthenticated:boolean = false;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    console.log('Login component loaded.');
    this.isAuthenticated = this.auth.isAuthenticated();
  }
}
