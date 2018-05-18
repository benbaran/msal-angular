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
    const authority = config.authority;
    this.app = new Msal.UserAgentApplication(config.clientID, authority, config.callback,
      {
        navigateToLoginRequestUrl: this.config.navigateToLoginRequestUrl,
        redirectUri: this.getFullUrl(this.config.redirectUrl)
      });
  }

  public getUser() {
    return this.authenticated.then(isauthenticated => isauthenticated ? this.user : {});
  }

  get authenticated() {
    return this.token.then(t => !!t);
  }

  get token() {
    return this.getToken();
  }

  public login() {
    return this.config.popup ?
      this.loginPopup() :
      this.loginRedirect();
  }

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
    this.user = null;
    this.app.logout();
  }

  public loginPopup() {
    return this.app.loginPopup(this.config.graphScopes).then((idToken) => {
      this.app.acquireTokenSilent(this.config.graphScopes).then(
        (token: string) => {
          return Promise.resolve(token);
        }, (error: any) => {
          this.app.acquireTokenPopup(this.config.graphScopes).then(
            (token: string) => {
              return Promise.resolve(token);
            }, (innererror: any) => {
              console.log('Error acquiring the popup:\n' + innererror);
              return Promise.resolve('');
            });
        });
    }, (error: any) => {
      console.log('Error during login:\n' + error);
      return Promise.resolve('');
    });
  }

  private loginRedirect() {
    this.app.loginRedirect(this.config.graphScopes);
    return this.getToken().then(() => {
      Promise.resolve(this.app.getUser());
    });
  }

  private getFullUrl(url: string): string {
    // this create a absolute url from a relative one.
    const pat = /^https?:\/\//i;
    return pat.test(url) ? url : this.origin() + url;
  }

  private origin() {
    return (window.location.origin) ? window.location.origin :
      window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }
}
