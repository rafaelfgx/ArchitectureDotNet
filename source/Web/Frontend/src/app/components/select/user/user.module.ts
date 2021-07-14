import { NgModule } from "@angular/core";
import { AppSelectModule } from "../select.module";
import { AppSelectUserComponent } from "./user.component";

@NgModule({
    declarations: [
        AppSelectUserComponent
    ],
    exports: [
        AppSelectUserComponent
    ],
    imports: [
        AppSelectModule
    ]
})
export class AppSelectUserModule { }
