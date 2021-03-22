import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "currency-cell",
  template: `
    {{ params.value | date: "dd-MM-yyyy" }}
  `
})
export class ButtonsRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
