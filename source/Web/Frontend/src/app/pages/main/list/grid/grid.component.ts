import { Component } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { Grid } from "src/app/components/grid/grid";
import { GridParameters } from "src/app/components/grid/grid-parameters";
import { User } from "src/app/models/user";
import { AppUserService } from "src/app/services/user.service";

@Component({
    selector: "app-list-grid",
    templateUrl: "./grid.component.html"
})
export class AppListGridComponent {
    filters = this.formBuilder.group({
        Id: new FormControl(),
        FirstName: new FormControl(),
        Email: new FormControl()
    });

    grid = new Grid<User>();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly appUserService: AppUserService) {
        this.init();
    }

    load() {
        this.appUserService.grid(this.grid.parameters).subscribe((grid) => this.grid = grid);
    }

    private filter() {
        this.grid.parameters = new GridParameters();
        this.grid.parameters.filters.addFromFormGroup(this.filters);
        this.load();
    }

    private init() {
        this.grid.parameters.order.property = "Id";
        this.filters.valueChanges.pipe(debounceTime(0)).subscribe(() => this.filter());
        this.load();
    }
}
