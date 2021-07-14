import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppHomeComponent } from "./home.component";

const ROUTES: Routes = [
    { path: "", component: AppHomeComponent }
];

@NgModule({
    declarations: [AppHomeComponent],
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class AppHomeModule { }
