import { FormGroup } from "@angular/forms";
import { Filter } from "./filter";

export class Filters extends Array<Filter> {
    add(property: string, comparison: string, value: any) {
        if (!property || !value) { return; }
        this.removeIndex(this.findIndex(x => x.property === property && x.comparison === comparison));
        this.push(new Filter(property, comparison, value));
    }

    addFromFormGroup(form: FormGroup) {
        if (!form || !form.controls) { return; }
        Object.keys(form.controls).forEach(key => this.add(key, "", form.controls[key].value));
    }

    remove(property: string) {
        if (!property) { return; }
        this.removeIndex(this.findIndex(x => x.property === property));
    }

    private removeIndex(index: number) {
        if (index < 0) { return; }
        this.splice(index, 1);
    }
}
