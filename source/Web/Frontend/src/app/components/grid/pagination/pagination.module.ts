import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppPaginationComponent } from "./pagination.component";

@NgModule({
    declarations: [
        AppPaginationComponent
    ],
    exports: [
        AppPaginationComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AppPaginationModule { }
