import { GridParameters } from "./grid-parameters";

export class Grid<T> {
    count = 0;
    list = new Array<T>();
    parameters = new GridParameters();
}
