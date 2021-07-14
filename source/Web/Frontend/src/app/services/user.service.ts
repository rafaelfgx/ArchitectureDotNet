import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GridParameters } from "src/app/components/grid/grid-parameters";
import { GridService } from "src/app/components/grid/grid.service";
import { User } from "src/app/models/user";

@Injectable({ providedIn: "root" })
export class AppUserService {
    constructor(
        private readonly http: HttpClient,
        private readonly gridService: GridService) { }

    add = (user: User) => this.http.post<number>("users", user);

    delete = (id: number) => this.http.delete(`users/${id}`);

    get = (id: number) => this.http.get<User>(`users/${id}`);

    grid = (parameters: GridParameters) => this.gridService.get<User>(`users/grid`, parameters);

    inactivate = (id: number) => this.http.patch(`users/${id}/inactivate`, {});

    list = () => this.http.get<User[]>("users");

    update = (user: User) => this.http.put(`users/${user.id}`, user);
}
