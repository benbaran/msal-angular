import { Injectable } from '@angular/core';
import { MsalConfig } from './msal-config';
import * as Msal from 'msal';

@Injectable()
export class MsalService {

  constructor() { }

  public error: string;

  private app: Msal.UserAgentApplication;
  private config: MsalConfig;

  public init(configuration: MsalConfig) {

    this.config = configuration;

    this.app = new Msal.UserAgentApplication(this.config.clientID, '', () => {});
  }

  get authenticated() {
    const user = this.app.getUser();
    if (user) {
      return true;
    }
    return false;
  }

  get token() {

    const token = this.getToken();

    return token;
  }

  public login() {
    return this.app.loginPopup(this.config.graphScopes)
      .then((idToken) => {
        const user = this.app.getUser();
        if (user) {
          return user;
        } else {
          return null;
        }
      }, () => {
        return null;
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