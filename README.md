# msal-angular

## Installation

First you need to install the npm module:

```sh
npm install msal-angular --save
```

## Usage

#### 1. Import the `MsalModule`:

```ts
@NgModule({
  imports: [MsalModule.forRoot({
      clientID: 'eee52664-009c-4b22-9327-5aec0e623c98',
      graphScopes: ["openid"],
      signUpSignInPolicy: 'B2C_1_SiUpIn',
      tenant: 'xxx.onmicrosoft.com'
    })]
  })
  export class AppModule { }
```

#### 2. Login:

```ts
constructor(private msalService: MsalService) { }

public login(): void {
    this.msalService.login()
}
```