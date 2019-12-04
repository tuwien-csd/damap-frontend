import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  data:any = [];
  token:string = undefined;

  private apiUrl = 'http://localhost:8080/repositories';

  constructor(private http: HttpClient, private auth:AuthService) {}

  ngOnInit() {
    this.token = this.auth.getToken();
  }

  load() {
    let headers:HttpHeaders = new HttpHeaders({
      'Authorization':'Bearer ' + this.token,
      'Accept': "application/json"
    });
    this.http.get(this.apiUrl, {headers: headers}).subscribe((data:JSON) => this.data = data);
  }


}
