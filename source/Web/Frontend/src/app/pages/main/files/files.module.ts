import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppFileModule } from "src/app/components/file/file.module";
import { AppFilesComponent } from "./files.component";

const ROUTES: Routes = [
    { path: "", component: AppFilesComponent }
];

@NgModule({
    declarations: [AppFilesComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(ROUTES),
        AppFileModule
    ]
})
export class AppFilesModule { }
