import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppOrderComponent } from "./order.component";

@NgModule({
    declarations: [
        AppOrderComponent
    ],
    exports: [
        AppOrderComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AppOrderModule { }
