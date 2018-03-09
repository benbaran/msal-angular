import { tokenReceivedCallback } from "msal/lib-commonjs/UserAgentApplication";

export class MsalConfig {
    public clientID: string;
    public b2cScopes: string[];
    public signUpSignInPolicy?: string;
    public tenant?: string;
    public popup?: boolean = true;
    public callback?: tokenReceivedCallback =
        (errorDesc: any, token: any, error: any, tokenType: any) => {
            if (error) {
                console.error(`${error} ${errorDesc}`);
            };
        }
}
