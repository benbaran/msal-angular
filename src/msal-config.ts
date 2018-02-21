export interface MsalConfig {
    clientID: string;
    redirectUri: string;
    graphScopes: string[];
    signUpSignInPolicy?: string;
    tenant?: string;
}

