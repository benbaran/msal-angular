export interface MsalConfig {
    clientID: string;
    graphScopes: string[];
    redirectUri? : string;
    signUpSignInPolicy?: string;
    tenant?: string;
}

