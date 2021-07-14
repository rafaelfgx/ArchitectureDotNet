import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Settings } from "./settings";

@Injectable({ providedIn: "root" })
export class AppSettingsService {
    settings!: Settings;

    constructor(private http: HttpClient) {
        this.http.get<Settings>("./assets/settings.json").subscribe((settings) => this.settings = settings);
    }
}
