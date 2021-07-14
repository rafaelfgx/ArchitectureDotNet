import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
import { Option } from "../option";
import { AppSelectComponent } from "../select.component";

@Component({
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: AppSelectUserComponent, multi: true }],
    selector: "app-select-user",
    templateUrl: "../select.component.html"
})
export class AppSelectUserComponent extends AppSelectComponent {
    @Input() autofocus = false;
    @Input() child!: AppSelectComponent;
    @Input() class!: string;
    @Input() disabled = false;
    @Input() formControlName!: string;
    @Input() text!: string;

    constructor(private readonly http: HttpClient) {
        super();
        this.load();
    }

    getOptions(_: any): Observable<Option[]> {
        return this.http
            .get("https://jsonplaceholder.cypress.io/users")
            .pipe(mergeMap((x: any) => x), map((x: any) => new Option(x.id, x.name)), toArray());
    }
}
