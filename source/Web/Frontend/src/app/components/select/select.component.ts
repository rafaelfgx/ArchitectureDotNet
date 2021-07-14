import { Observable } from "rxjs";
import { AppBaseComponent } from "../base/base.component";
import { Option } from "./option";

export abstract class AppSelectComponent extends AppBaseComponent<any> {
    abstract child: AppSelectComponent;

    options = new Array<Option>();

    change($event: any) {
        this.value = $event.target.value;
        this.changeChildren(true);
    }

    clearOptions() {
        this.options = new Array<Option>();
    }

    abstract getOptions(parameter?: any): Observable<Option[]>;

    load(parameter?: any) {
        this.getOptions(parameter).subscribe((options: Option[]) => { this.options = options; });
    }

    writeValue(value: any) {
        this.value = value;
        this.changeChildren();
    }

    private changeChildren(clearValue: boolean = false) {
        if (!this.child) { return; }

        let child = this.child;

        while (child) {
            child.clearOptions();
            if (clearValue) { child.value = undefined; }
            child = child.child;
        }

        this.child.load(this.value);
    }
}
