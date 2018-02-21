import { Injectable, InjectionToken, Inject } from '@angular/core';
import { MsalConfig } from './msal-config';
import * as Msal from 'msal';

export const MSAL_CONFIG = new InjectionToken<string>('MSAL_CONFIG');

@Injectable()
export class MsalService {

  public error: string;

  private app: Msal.UserAgentApplication;

  constructor(@Inject(MSAL_CONFIG) private config: MsalConfig) {
    const authority = (config.tenant && config.signUpSignInPolicy) ?
      `https://login.microsoftonline.com/tfp/${config.tenant}/${config.signUpSignInPolicy}` :
      "";
    this.app = new Msal.UserAgentApplication(config.clientID, authority, () => { });
  }

  get authenticated() {
    return !!this.app.getUser()
  }

  get token() {
    return this.getToken();
  }

  public login() {
    return this.app.loginPopup(this.config.graphScopes)
      .then((idToken) => {
        return this.getToken().then(() => this.app.getUser());
      });
  }

  public logout() {
    this.app.logout();
  }

  public getToken() {
    return this.app.acquireTokenSilent(this.config.graphScopes)
      .then((accessToken) => {
        return accessToken;
      }, (error) => {
        return this.app.acquireTokenPopup(this.config.graphScopes)
          .then((accessToken) => {
            return accessToken;
          }, (err) => {
            this.error = err;
          });
      });
  }
}