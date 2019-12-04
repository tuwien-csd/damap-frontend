import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http:HttpClient) { }

  private tokenUrl = 'https://keycloak.devcloud.tiss.tuwien.ac.at/auth/realms/quarkus/protocol/openid-connect/token';

  login(username:string, password:string) : Observable<any> {
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept': "application/json"
    });
    let test = 'grant_type=password&client_id=quarkus&username=' + username + '&password=' + password + '&client_secret=56010f15-e36d-4de7-a294-36bde38225f1';
    return this.http.post(this.tokenUrl, test, {observe: 'response', headers: headers});
  }

  private refresh() : Observable<any> {
    let refreshToken:string = sessionStorage.getItem('REFRESH_TOKEN');
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept': "application/json"
    });
    let test = 'grant_type=refresh_token&client_id=quarkus&refresh_token=' + refreshToken + '&client_secret=56010f15-e36d-4de7-a294-36bde38225f1';
    return this.http.post(this.tokenUrl, test, {observe: 'response', headers: headers});
  }

  initSession(data) {
    let jwt:any = data.body;
    AuthService.setAccessToken(jwt.access_token);
    AuthService.setRefreshToken(jwt.refresh_token);
    this.router.navigate(['/dashboard']).then(r => console.log(r));
  }

  static setAccessToken(accessToken:string) {
    sessionStorage.setItem('ACCESS_TOKEN', accessToken);
  }

  static setRefreshToken(refreshToken:string) {
    sessionStorage.setItem('REFRESH_TOKEN', refreshToken);
  }

  getRoles() : string[] {
    if (this.isAuthenticated()) {
      return AuthService.decodeAccessToken().realm_access.roles;
    } else {
      return [];
    }
  }

  getName() : string {
    if (this.isAuthenticated()) {
      return AuthService.decodeAccessToken().name;
    } else {
      return undefined;
    }
  }

  getUsername() : string {
    if (this.isAuthenticated()) {
      return AuthService.decodeAccessToken().preferred_username;
    } else {
      return undefined;
    }
  }

  getExpiresAt() : Date {
    if(this.isAuthenticated()) {
      return new Date(AuthService.decodeAccessToken().exp * 1000);
    } else {
      return undefined;
    }
  }

  isExpired() : boolean {
    return new Date() > this.getExpiresAt();
  }

  getToken() : string {
    if(this.isExpired()) this.refresh().subscribe(data => this.initSession(data));
    return this.isAuthenticated() ? sessionStorage.getItem('ACCESS_TOKEN') : undefined;
  }

  private static decodeAccessToken() : any {
    let token: string = AuthService.fetchAccessFromStore();
    let parts: string[] = token.split('.');
    return JSON.parse(atob(parts[1]));
  }

  private static fetchAccessFromStore() : string {
    return sessionStorage.getItem('ACCESS_TOKEN');
  }

  isAuthenticated() : boolean {
    return sessionStorage.getItem('ACCESS_TOKEN') != null;
  }
}
