import { Component } from "@angular/core";
import { GridOptions } from "@ag-grid-community/all-modules";
import { HttpClient } from "@angular/common/http";
import { DateRendererComponent } from "./components/date-renderer.component";
import { ButtonsRendererComponent } from "./components/buttons-renderer.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private defaultColDef;
  public rowData;
  private rowSelection;
  private jsonData = "";
  private frameworkComponents;
  private gridOptions: GridOptions;
  browserWidth: number = window.innerWidth;
  browserHeight: number = window.innerHeight;

  public columns = [
    {
      headerName: "",
      field: "Id",
      cellRenderer: "ButtonsRendererComponent",
      valueGetter: function(params) {
        return {
          Id: params.data.Id,
          Title: params.data.Title
        };
      },
      width: 200
    },
    {
      headerName: "Title",
      field: "Title",
      resizable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true
    },
    {
      headerName: "Date",
      field: "CreatedDate",
      resizable: true,
      cellRenderer: "DateRendererComponent",
      filter: "agDateColumnFilter",
      floatingFilter: true
    },
    {
      headerName: "Status",
      field: "JobStatus",
      resizable: true,
      sortable: true
    }
  ];

  constructor(private http: HttpClient) {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
      enableFilter: true
    };
    // Column Defs
    this.gridOptions.columnDefs = this.columns;

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.rowSelection = "single";
    this.gridOptions.pagination = true;
    this.gridOptions.skipHeaderOnAutoSize = true;

    this.frameworkComponents = {
      DateRendererComponent: DateRendererComponent,
      ButtonsRendererComponent: ButtonsRendererComponent
    };
  }

  // tslint:disable-next-line:typedef
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  // tslint:disable-next-line:typedef
  autoSizeAll(skipHeader) {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  // tslint:disable-next-line:typedef
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://hiringmanagerwebapi.azurewebsites.net/api/jobService/getJobListByCompanyId?CompanyId=1"
      )
      .subscribe(data => {
        this.rowData = data;
      });
    // this.sizeToFit();
  }

  // tslint:disable-next-line:typedef
  onSelectionChanged() {
    let selectedRows = this.gridApi.getSelectedRows();
    // document.querySelector('#selectedRows').innerHTML =
    // selectedRows.length === 1 ? selectedRows[0].Title : '';
  }
}
