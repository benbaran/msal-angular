import { tokenReceivedCallback } from "msal/lib-commonjs/UserAgentApplication";

export class MsalConfig {
    public clientID: string;
    public graphScopes: string[];
    public signUpSignInPolicy?: string;
    public tenant?: string;
    public popup?: boolean = false;
    public callback: tokenReceivedCallback = () => { };
}

