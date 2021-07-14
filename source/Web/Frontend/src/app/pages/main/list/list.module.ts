import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppListGridModule } from "./grid/grid.module";
import { AppListComponent } from "./list.component";

const ROUTES: Routes = [
    { path: "", component: AppListComponent }
];

@NgModule({
    declarations: [AppListComponent],
    imports: [
        RouterModule.forChild(ROUTES),
        AppListGridModule
    ]
})
export class AppListModule { }
