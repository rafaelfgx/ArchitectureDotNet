import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppErrorHandler } from "./app.error.handler";
import { AppHttpInterceptor } from "./app.http.interceptor";
import { ROUTES } from "./app.routes";
import { AppLayoutsModule } from "./layouts/layouts.module";
import { AppSettingsService } from "./settings/settings.service";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES),
        AppLayoutsModule
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: APP_INITIALIZER, useFactory: (_: AppSettingsService) => () => { }, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
    ]
})
export class AppModule { }
