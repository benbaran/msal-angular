export interface MsalConfig {
    clientID: string;
    graphScopes: string[];
    signUpSignInPolicy?: string;
    tenant?: string;
}

