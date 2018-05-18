import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MsalService } from './msal.service';

@Injectable()
export class MsalGuard implements CanActivate {

  constructor(private msalService: MsalService) { }

  canActivate() {
    return this.msalService.authenticated;
  }
}
