import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { AppModalService } from "src/app/services/modal.service";

@Injectable({ providedIn: "root" })
export class AppErrorHandler implements ErrorHandler {
    constructor(private readonly appModalService: AppModalService) { }

    handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            switch (error.status) {
                case 422: { this.appModalService.alert(error.error); return; }
            }
        }

        console.error(error);
    }
}
