import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  public token: string | null = '';

  public setJwtToken(token: string) {
    localStorage.setItem('Auth', token);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('Auth');
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer: ${this.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
