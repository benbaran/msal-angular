import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MsalAuthenticationService } from './msal-authentication.service';

@Injectable()
export class MsalInterceptor implements HttpInterceptor {

  constructor(private authenticationService: MsalAuthenticationService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const JWT = `Bearer ${this.authenticationService.getToken()}`;
    req = req.clone({
      setHeaders: {
        Authorization: JWT,
      },
    });
    return next.handle(req);
  }
}
