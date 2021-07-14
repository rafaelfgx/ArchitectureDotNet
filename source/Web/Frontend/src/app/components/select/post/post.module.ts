import { NgModule } from "@angular/core";
import { AppSelectModule } from "../select.module";
import { AppSelectPostComponent } from "./post.component";

@NgModule({
    declarations: [
        AppSelectPostComponent
    ],
    exports: [
        AppSelectPostComponent
    ],
    imports: [
        AppSelectModule
    ]
})
export class AppSelectPostModule { }
