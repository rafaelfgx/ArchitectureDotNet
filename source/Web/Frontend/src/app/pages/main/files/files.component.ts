import { Component } from "@angular/core";
import { FileInfo } from "src/app/components/file/fileinfo";

@Component({
    selector: "app-files",
    templateUrl: "./files.component.html"
})
export class AppFilesComponent {
    files = new Array<FileInfo>();
}
