import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppButtonModule } from "src/app/components/button/button.module";
import { AppLabelModule } from "src/app/components/label/label.module";
import { AppSelectCommentModule } from "src/app/components/select/comment/comment.module";
import { AppSelectPostModule } from "src/app/components/select/post/post.module";
import { AppSelectUserModule } from "src/app/components/select/user/user.module";
import { AppFormComponent } from "./form.component";

const ROUTES: Routes = [
    { path: "", component: AppFormComponent }
];

@NgModule({
    declarations: [AppFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        AppButtonModule,
        AppLabelModule,
        AppSelectCommentModule,
        AppSelectPostModule,
        AppSelectUserModule
    ]
})
export class AppFormModule { }
