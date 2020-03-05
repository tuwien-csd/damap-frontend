import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent {

  data:any = [];
  token:string = undefined;

  private apiUrl = 'http://localhost:8080/repositories';

  constructor(private http: HttpClient) {}

  load() {
    this.http.get(this.apiUrl).subscribe((data:JSON) => this.data = data);
  }

}
