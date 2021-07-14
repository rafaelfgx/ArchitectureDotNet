import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Page } from "./page";

@Component({
    selector: "app-pagination",
    templateUrl: "./pagination.component.html"
})
export class AppPaginationComponent {
    get count(): number {
        return this._count;
    }

    @Input("count")
    set count(count: number) {
        this._count = count;
        this.setPages();
    }

    get page(): Page {
        return this._page;
    }

    @Input("page")
    set page(page: Page) {
        this._page = page;
        this.setPages();
    }

    @Output() readonly changed = new EventEmitter();

    pages = 0;
    private _count = 0;
    private _page = new Page();

    change(index: number) {
        this.page.index = index;
        this.changed.emit();
    }

    setPages() {
        this.pages = Math.ceil(this.count / this.page.size);
    }
}
