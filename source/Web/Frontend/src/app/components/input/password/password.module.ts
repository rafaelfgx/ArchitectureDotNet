import { NgModule } from "@angular/core";
import { AppInputModule } from "../input.module";
import { AppInputPasswordComponent } from "./password.component";

@NgModule({
    declarations: [
        AppInputPasswordComponent
    ],
    exports: [
        AppInputPasswordComponent
    ],
    imports: [
        AppInputModule
    ]
})
export class AppInputPasswordModule extends AppInputModule { }
