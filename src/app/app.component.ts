import { Component } from "@angular/core";
import { GridOptions } from "ag-grid";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  private gridOptions: GridOptions;

  constructor() {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      enableFilter: true
    };

    this.gridOptions.columnDefs = [
      {
        headerName: "Make",
        field: "make",
        width: 100
      },
      {
        headerName: "Model",
        field: "model",
        width: 100
      },
      {
        headerName: "Price",
        field: "price",
        width: 100
      }
    ];

    this.gridOptions.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }
    ];
  }
}
