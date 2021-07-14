import { ControlValueAccessor } from "@angular/forms";

export abstract class AppBaseComponent<Value> implements ControlValueAccessor {
    abstract class: string;
    abstract disabled = false;
    abstract formControlName: string;
    abstract text: string;

    private _value!: Value;

    get value(): Value {
        return this._value;
    }

    set value(value: Value) {
        if (this.value === value) { return; }
        this._value = value;
        if (this.onChange) { this.onChange(value); }
    }

    private onChange!: (value: Value) => void;

    registerOnChange(onChange: any) {
        this.onChange = onChange;
    }

    registerOnTouched(_: () => void) { }

    writeValue(value: Value) {
        this.value = value;
    }
}
