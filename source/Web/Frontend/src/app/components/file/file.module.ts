import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppFileComponent } from "./file.component";

@NgModule({
    declarations: [
        AppFileComponent
    ],
    exports: [
        AppFileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppFileModule { }
