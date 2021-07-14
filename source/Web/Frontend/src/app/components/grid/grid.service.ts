import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filters } from "./filter/filters";
import { Grid } from "./grid";
import { GridParameters } from "./grid-parameters";
import { Order } from "./order/order";
import { Page } from "./pagination/page";

@Injectable({ providedIn: "root" })
export class GridService {
    constructor(private readonly http: HttpClient) { }

    get<T>(url: string, parameters: GridParameters) {
        return this.http.get<Grid<T>>(url + this.queryString(parameters));
    }

    private queryString(parameters: GridParameters): string {
        let url = "?";

        parameters.page = parameters.page ?? new Page();
        url += `page.index=${parameters.page.index}&`;
        url += `page.size=${parameters.page.size}&`;

        parameters.order = parameters.order ?? new Order();
        url += `order.property=${parameters.order.property ?? ""}&`;
        url += `order.ascending=${parameters.order.ascending}&`;

        parameters.filters = parameters.filters ?? new Filters();
        parameters.filters.forEach((filter, index) => {
            url += `filters[${index}].property=${filter.property}&`;
            url += `filters[${index}].comparison=${filter.comparison ?? ""}&`;
            url += `filters[${index}].value=${filter.value}&`;
        });

        url = url.slice(0, url.length - 1);

        return url;
    }
}
