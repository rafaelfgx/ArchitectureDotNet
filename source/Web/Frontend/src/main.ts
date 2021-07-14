import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

if (location.hostname !== "localhost") { enableProdMode(); }
platformBrowserDynamic().bootstrapModule(AppModule).catch((error: any) => console.error(error));
