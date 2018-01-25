import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MsalService } from './msal.service';

@Injectable()
export class MsalInterceptor implements HttpInterceptor {

    constructor(private msalService: MsalService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const JWT = `Bearer ${this.msalService.getToken()}`;
        req = req.clone({
            setHeaders: {
                Authorization: JWT,
            },
        });
        return next.handle(req);
    }
}
