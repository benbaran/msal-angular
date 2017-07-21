import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MsalGraphService {

  private readonly graphUrl = 'https://graph.microsoft.com/v1.0/';

  constructor(private http: HttpClient) {

  }

  public getUserInfo(token: string) {
    return this.http.get(this.graphUrl + '/me')
      .catch((response) => Observable.throw(response.text()));
  }
}
