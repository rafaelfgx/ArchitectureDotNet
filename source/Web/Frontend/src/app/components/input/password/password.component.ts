import { Component, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AppInputComponent } from "../input.component";

@Component({
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: AppInputPasswordComponent, multi: true }],
    selector: "app-input-password",
    templateUrl: "../input.component.html"
})
export class AppInputPasswordComponent extends AppInputComponent {
    @Input() autofocus = false;
    @Input() class!: string;
    @Input() disabled = false;
    @Input() formControlName!: string;
    @Input() text!: string;

    constructor() {
        super("password");
    }
}
