import { Injectable } from "@angular/core";

@Injectable()
export class MsalConfig {
    public clientID: string;
    public redirectUri: string;
    public graphScopes: string[];
    public signUpSignInPolicy: string;
    public tenant: string;
}
