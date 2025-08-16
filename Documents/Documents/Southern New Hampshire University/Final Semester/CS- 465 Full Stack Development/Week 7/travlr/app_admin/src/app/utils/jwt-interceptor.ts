// app_admin/src/app/utils/jwt-interceptor.ts
import { Injectable, Provider } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication'; // ✅ fix import

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = (request.url || '').toLowerCase();

    // Don't attach token to auth calls
    const isAuthApi =
      url.endsWith('/login') ||
      url.endsWith('/register') ||
      url.includes('/api/login') ||
      url.includes('/api/register');

    const token = this.authenticationService.getToken();

    if (token && !isAuthApi) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request);
  }
}

// Provide via DI
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
