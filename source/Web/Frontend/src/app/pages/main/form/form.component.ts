import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html"
})
export class AppFormComponent {
    disabled = false;

    form = this.formBuilder.group({
        userId: ["", Validators.required],
        postId: ["", Validators.required],
        commentId: ["", Validators.required]
    });

    constructor(private readonly formBuilder: FormBuilder) { }

    set() {
        this.form.patchValue({ userId: "10", postId: "100", commentId: "500" });
    }
}
