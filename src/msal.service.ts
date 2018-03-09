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
      `https://login.microsoftonline.com/tfp/${config.tenant}/${config.signUpSignInPolicy}` :
      '';
    this.app = new Msal.UserAgentApplication(config.clientID, authority, config.callback, { navigateToLoginRequestUrl: false });
  }


  public getUser() {
    if (this.authenticated)
      return this.user;
    return {};
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
      this.loginRedirect()
  }

  public getToken(): Promise<string> {
    return this.app.acquireTokenSilent(this.config.b2cScopes)
      .then(token => {
        return token;
      }).catch(error => {
        return this.app.acquireTokenPopup(this.config.b2cScopes)
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
   return this.app.loginPopup(this.config.b2cScopes).then((idToken) => {
      this.app.acquireTokenSilent(this.config.b2cScopes).then(
        (token: string) => {
          return Promise.resolve(token);
        }, (error: string) => {
          this.app.acquireTokenPopup(this.config.b2cScopes).then(
            (token: string) => {
              return Promise.resolve(token);
            }, (error: any) => {
              console.log("Error acquiring the popup:\n" + error);
              return Promise.resolve('');
            });
        })
    }, (error: any) => {
      console.log("Error during login:\n" + error);
      return Promise.resolve('');
    });
  }

  private loginRedirect() {
    this.app.loginRedirect(this.config.b2cScopes);
    return this.getToken().then(() => {
      Promise.resolve(this.app.getUser());
    });
  }
}