import { AppBaseComponent } from "../base/base.component";

export abstract class AppInputComponent extends AppBaseComponent<any> {
    type!: string;

    constructor(type: string) {
        super();
        this.type = type;
    }

    input($event: any): void {
        this.value = $event.target.value;
    }
}
