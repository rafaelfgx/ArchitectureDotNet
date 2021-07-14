import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppButtonModule } from "src/app/components/button/button.module";
import { AppOrderModule } from "src/app/components/grid/order/order.module";
import { AppPaginationModule } from "src/app/components/grid/pagination/pagination.module";
import { AppInputTextModule } from "src/app/components/input/text/text.module";
import { AppListGridComponent } from "./grid.component";

@NgModule({
    declarations: [AppListGridComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppOrderModule,
        AppPaginationModule,
        AppButtonModule,
        AppInputTextModule
    ],
    exports: [AppListGridComponent]
})
export class AppListGridModule { }
