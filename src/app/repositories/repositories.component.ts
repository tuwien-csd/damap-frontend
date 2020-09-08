import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent {

  data:any = [];
  token:string = undefined;

  private apiUrl = environment.backendUrl + '/repositories';

  constructor(private http: HttpClient) {}

  load() {
    this.http.get(this.apiUrl).subscribe((data:JSON) => this.data = data);
  }

}
