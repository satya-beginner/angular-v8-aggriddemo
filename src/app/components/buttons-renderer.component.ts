import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "jbuttons",
  template: `
    {{ jobId }} {{ jobTitle }}
    <button (click)="test()">delete</button>
  `
})
export class ButtonsRendererComponent implements ICellRendererAngularComp {
  public params: any;
  jobId;
  jobTitle;

  agInit(params: any): void {
    console.log(params);
    this.params = params["value"];
    this.jobId = params["value"]["Id"];
    this.jobTitle = params["value"]["Title"];
  }

  refresh(): boolean {
    return false;
  }

  test() {
    alert("TODO action");
  }
}
