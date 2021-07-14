import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppAuthService } from "src/app/services/auth.service";

@Injectable({ providedIn: "root" })
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private readonly appAuthService: AppAuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${this.appAuthService.token()}` }
        });

        return next.handle(request);
    }
}
