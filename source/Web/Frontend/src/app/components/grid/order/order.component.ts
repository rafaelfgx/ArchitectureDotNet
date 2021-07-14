import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Order } from "./order";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html"
})
export class AppOrderComponent {
    @Output() readonly changed = new EventEmitter();
    @Input() order!: Order;
    @Input() property!: string;
    @Input() text!: string;

    click() {
        this.order = this.order ?? new Order();
        this.order.property = this.property;
        this.order.ascending = !this.order.ascending;
        this.changed.emit();
    }
}
