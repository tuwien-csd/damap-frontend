import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FeedbackService } from '../services/feedback.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private oAuthService: OAuthService,
    private feedbackService: FeedbackService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const accessToken = this.oAuthService.getAccessToken();
    if (accessToken == null) {
      return next.handle(req);
    }

    const date = new Date(this.oAuthService.getAccessTokenExpiration());
    const timeLeft = date.getTime() - new Date().getTime();

    if (timeLeft < 5) {
      alert('Your session has expired. Please log in again.');
      this.authService.logout();
      return new Observable<HttpEvent<any>>();
    }

    return next.handle(req);
  }
}
