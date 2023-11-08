import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/admin')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('admin_access_token')}`,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('user_access_token')}`,
        },
      });
    }
    return next.handle(request);
  }
}
