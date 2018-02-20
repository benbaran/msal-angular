import { MsalConfig } from "./msal-config";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { MsalService } from "./msal.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MsalInterceptor, MsalGuard } from ".";

@NgModule({
    providers: [MsalGuard ,{ provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }]
})
export class MsalModule {
    static forRoot(config: MsalConfig): ModuleWithProviders {
        return {
            ngModule: MsalModule,
            providers: [MsalService, { provide: 'config', useValue: config }]
        };
    }
}

