import { NgModule } from "@angular/core";
import { AppSelectModule } from "../select.module";
import { AppSelectCommentComponent } from "./comment.component";

@NgModule({
    declarations: [
        AppSelectCommentComponent
    ],
    exports: [
        AppSelectCommentComponent
    ],
    imports: [
        AppSelectModule
    ]
})
export class AppSelectCommentModule { }
