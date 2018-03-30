import { Injectable, InjectionToken, Inject } from '@angular/core';
import { MsalConfig } from './msal-config';
import * as Msal from 'msal';

export const MSAL_CONFIG = new InjectionToken<string>('MSAL_CONFIG');

@Injectable()
export class MsalService {

  public error: string;
  public user: any;

  private app: Msal.UserAgentApplication;

  constructor(@Inject(MSAL_CONFIG) private config: MsalConfig) {
    const authority = (config.tenant && config.signUpSignInPolicy) ? 
      `https://login.microsoftonline.com/tfp/${config.tenant}/${config.signUpSignInPolicy}` : '';
    this.app = new Msal.UserAgentApplication(
      config.clientID,
      authority,
      this.authCallback,
      {
        redirectUri: window.location.origin
      });
    this.app = new Msal.UserAgentApplication(config.clientID, authority, () => { });
  }

  get authenticated() {
    if(!this.user) {
      this.user = this.app.getUser();
    }
    return !!this.user;
  }

  public getUser(){
    if(this.authenticated)
      return this.user;
    return {};
  }

  get token() {
    return this.getToken();
  }

  public login() {
    return this.app.loginPopup(this.config.graphScopes)
      .then((idToken) => {
        return this.getToken().then(() => {
          Promise.resolve(this.app.getUser());
        });
      });
  };

  public loginRedirect() {
    return this.app.loginRedirect(this.config.graphScopes);
  };
  
  public getToken(): Promise<string> {
    return this.app.acquireTokenSilent(this.config.graphScopes)
      .then(token => {
        return token;
      }).catch(error => {
        return this.app.acquireTokenPopup(this.config.graphScopes)
          .then(token => {
            return Promise.resolve(token);
          }).catch(innererror => {
            return Promise.resolve('');
          });
      });
  }

  public logout() {
    this.user=null;
    this.app.logout();
  }

  private authCallback(errorDesc: any, token: any, error: any, tokenType: any) {
    if (error) {
      console.error(`${error} ${errorDesc}`);
    }
  }
}
