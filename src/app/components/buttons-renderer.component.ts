import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "jbuttons",
  template: `
    <button
      (click)="test()"
      >delete</mat-icon
    >
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

  test() {
    alert("TODO action");
  }
}
