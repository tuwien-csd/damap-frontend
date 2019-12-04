import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public title:string = 'Data Management Plan';

  constructor(private auth:AuthService) { }

  ngOnInit() { }

  public logout() {
    this.auth.logout();
  }

}
