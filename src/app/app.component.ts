import {Component} from '@angular/core';
import {GridOptions} from '@ag-grid-community/all-modules';
import {HttpClient} from '@angular/common/http';
import {DateRendererComponent} from './components/date-renderer.component';
import {ButtonsRendererComponent} from './components/buttons-renderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private gridApi;
    private gridColumnApi;
    private columnDefs;
    private defaultColDef;
    public rowData;
    private rowSelection;
    private jsonData = '';
    private frameworkComponents;
    private gridOptions: GridOptions;
    browserWidth: number = window.innerWidth;
    browserHeight: number = window.innerHeight;

    public mobileColumns = [
        {headerName: 'JobID', field: 'JobID'},
        {headerName: 'Title', field: 'Title'},
        {headerName: 'Company', field: 'CompanyName'},
        {headerName: 'Status', field: 'JobStatus'}
    ];

    public webColumns = [
        {
            headerName: '',
            field: '',
            pinned: 'left',
            checkboxSelection: true,
            width: 50,
        },
        {
            headerName: '',
            field: 'JobID',
            pinned: 'left',
            cellRenderer: 'ButtonsRendererComponent',
            width: 100,
        },
        {
            headerName: 'JobID',
            field: 'JobID',
            resizable: true,
            pinned: 'left',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            valueFormatter: 'bracketsFormatter',
            width: 100,
        },
        {
            headerName: 'Job',
            children: [
                {
                    headerName: 'Title',
                    field: 'Title',
                    filter: 'agTextColumnFilter',
                    floatingFilter: true,
                },
                {
                    headerName: 'Company',
                    field: 'CompanyName',
                    columnGroupShow: 'closed',
                    filter: 'agTextColumnFilter',
                    floatingFilter: true,
                },
                {
                    headerName: 'Location',
                    field: 'Location',
                    columnGroupShow: 'closed',
                    filter: 'agTextColumnFilter',
                    floatingFilter: true,
                }
            ]
        },
        {
            headerName: 'Date',
            field: 'CreatedDate',
            resizable: true,
            cellRenderer: 'DateRendererComponent',
            filter: 'agDateColumnFilter',
            floatingFilter: true,
        },
        {
            headerName: 'Hiring Manager',
            field: '',
            resizable: true
        },
        {
            headerName: 'Status',
            field: 'JobStatus',
            resizable: true,
            sortable: true
        }
    ];

    constructor(private http: HttpClient) {
        this.gridOptions = <GridOptions> {
            enableSorting: true,
            enableFilter: true
        };
        // Column Defs
        if (this.browserWidth <= 520) {
            this.gridOptions.columnDefs = this.mobileColumns;
        }else{
            this.gridOptions.columnDefs = this.webColumns;
        }

        this.defaultColDef = {
            sortable: true,
            resizable: true,
            // width: 20
        };

        this.rowSelection = 'single';
        this.gridOptions.pagination = true;
        this.gridOptions.skipHeaderOnAutoSize = true;

        this.frameworkComponents = {
            DateRendererComponent: DateRendererComponent,
            ButtonsRendererComponent: ButtonsRendererComponent
        };
    }

    onWindowResize(event) {
        this.browserWidth = event.target.innerWidth;
        // this.browserHeight = event.target.innerHeight;
        setTimeout(function() {
            if (this.browserWidth <= 520) {
                this.gridOptions.setColumnDefs(this.mobileColumn);
                this.params.api.sizeToFit();
                // this.gridApi.refresh();

            } else {
                this.gridOptions.setColumnDefs(this.webColumns);
                this.params.api.sizeToFit();
                // this.gridApi.refresh();
            }
        });
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
                'https://hiringmanagerwebapi.azurewebsites.net/api/job/GetAllJobsInfo'
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