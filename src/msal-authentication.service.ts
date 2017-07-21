import { Injectable } from '@angular/core';
import 'msal';
/// <reference path="../node_modules/msal/out/msal.d.ts" />

import { MsalAuthenticationConfig } from './msal-authentication-config';

@Injectable()
export class MsalAuthenticationService {

  public error: string;

  private app: Msal.UserAgentApplication;
  private config: MsalAuthenticationConfig;

  public init(configuration: MsalAuthenticationConfig) {

    this.config = configuration;

    this.app = new Msal.UserAgentApplication(this.config.clientID, '', () => {
      // No callback
    });
  }

  get authenticated() {
    const user = this.app.getUser();
    if (user) {
      return true;
    }
    return false;
  }

  get token() {

    const token = this.app.getUser().token;

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
