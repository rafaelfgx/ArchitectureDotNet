import { Component } from "@angular/core";
import { AppAuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html"
})
export class AppNavComponent {
    constructor(private readonly appAuthService: AppAuthService) { }

    signout() {
        this.appAuthService.signout();
    }
}
