import { NgModule } from "@angular/core";
import { AppInputModule } from "../input.module";
import { AppInputTextComponent } from "./text.component";

@NgModule({
    declarations: [
        AppInputTextComponent
    ],
    exports: [
        AppInputTextComponent
    ],
    imports: [
        AppInputModule
    ]
})
export class AppInputTextModule extends AppInputModule { }
