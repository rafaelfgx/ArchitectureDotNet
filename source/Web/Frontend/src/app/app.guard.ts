import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AppAuthService } from "src/app/services/auth.service";

@Injectable({ providedIn: "root" })
export class AppGuard implements CanActivate {
    constructor(private readonly appAuthService: AppAuthService) { }

    canActivate() {
        if (this.appAuthService.authenticated()) { return true; }
        this.appAuthService.signin();
        return false;
    }
}
