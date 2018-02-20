import { MsalConfig } from "./msal-config";
import { ModuleWithProviders } from "@angular/core";
import { MsalService } from "./msal.service";

export class MsalModule {
    static forRoot(config: MsalConfig): ModuleWithProviders {
        return {
            ngModule: MsalModule,
            providers: [MsalService, { provide: 'config', useValue: config }]
        };
    }
}