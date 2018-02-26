import { MsalConfig } from "./msal-config";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { MsalService, MSAL_CONFIG } from "./msal.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MsalInterceptor, MsalGuard } from ".";

@NgModule({
    providers: [MsalGuard]
})
export class MsalModule {
    static forRoot(config: MsalConfig): ModuleWithProviders {
        return {
            ngModule: MsalModule,
            providers: [
                { provide: MSAL_CONFIG, useValue: config },
                MsalService,
                { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
            ]
        };
    }
}

