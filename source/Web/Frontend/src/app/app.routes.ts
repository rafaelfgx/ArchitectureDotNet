import { Routes } from "@angular/router";
import { AppGuard } from "./app.guard";
import { AppLayoutMainComponent } from "./layouts/layout-main/layout-main.component";
import { AppLayoutComponent } from "./layouts/layout/layout.component";

export const ROUTES: Routes = [
    {
        path: "",
        component: AppLayoutComponent,
        children: [
            { path: "", loadChildren: () => import("./pages/signin/signin.module").then((module) => module.AppSigninModule) }
        ]
    },
    {
        path: "main",
        component: AppLayoutMainComponent,
        canActivate: [AppGuard],
        children: [
            { path: "files", loadChildren: () => import("./pages/main/files/files.module").then((module) => module.AppFilesModule) },
            { path: "form", loadChildren: () => import("./pages/main/form/form.module").then((module) => module.AppFormModule) },
            { path: "home", loadChildren: () => import("./pages/main/home/home.module").then((module) => module.AppHomeModule) },
            { path: "list", loadChildren: () => import("./pages/main/list/list.module").then((module) => module.AppListModule) }
        ]
    },
    {
        path: "**",
        redirectTo: ""
    }
];
