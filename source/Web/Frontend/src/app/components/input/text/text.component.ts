import { Component, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AppInputComponent } from "../input.component";

@Component({
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: AppInputTextComponent, multi: true }],
    selector: "app-input-text",
    templateUrl: "../input.component.html"
})
export class AppInputTextComponent extends AppInputComponent {
    @Input() autofocus = false;
    @Input() class!: string;
    @Input() disabled = false;
    @Input() formControlName!: string;
    @Input() text!: string;

    constructor() {
        super("text");
    }
}
