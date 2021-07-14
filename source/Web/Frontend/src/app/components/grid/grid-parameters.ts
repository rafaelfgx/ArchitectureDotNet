import { Filters } from "./filter/filters";
import { Order } from "./order/order";
import { Page } from "./pagination/page";

export class GridParameters {
    filters = new Filters();
    order = new Order();
    page = new Page();
}
