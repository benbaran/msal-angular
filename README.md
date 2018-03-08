

# msal-angular

This is a wrapper module to authenticate Angular applications to the Azure v2 endpoint. A working example can be found at: https://github.com/benbaran/msal-angular-example .


## Change Log

### 2.0.1
- Updated for Angular 5
- Several improvements contributed by Marcelh1983
- Updated build system

### 1.0.X 
- Initial version for Angular 4.

## Usage

### Register your Application on the App Registration Portal
1. Create a new app at apps.dev.microsoft.com
2. Add the Web platform for your app
3. Set the Redirect URI - for Angular CLI development this will be https://localhost:4200/
4. Enable Allow Implicit Flow
5. Copy the Application Id for use in the configuration


### Install the NPM Module
```sh
npm install msal-angular --save
```
### Usage in Angular CLI Application

#### 1. Import `MsalModule` into app.module.ts:

```ts
@NgModule({
  imports: [MsalModule.forRoot({
      clientID: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      graphScopes: ["openid"],
      signUpSignInPolicy: '',
      tenant: 'xxx.onmicrosoft.com'
    })]
  })
  export class AppModule { }
```

#### 2. Add Login, Logout Methods to Your Component:

```ts
  constructor(private msalService: MsalService) { }

  login() {
    this.msalService.login();
  }

  logout() {
    this.msalService.logout();
  }

  get authenticated(): boolean {
    return this.msalService.authenticated;
  }
```