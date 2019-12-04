import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject();

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    console.log('Login component loaded.');
  }

  login(username:string, password:string) {
    this.auth.login(username, password).subscribe(data => this.auth.initSession(data), LoginComponent.onError);
  }

  static onError() {
    alert('Login failed.');
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}


