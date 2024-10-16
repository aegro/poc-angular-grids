import { AgGridAngular } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { BarSparklineOptions, ColDef, GridApi, GridReadyEvent, INumberFilterParams, ModuleRegistry, RowGroupingDisplayType, RowSelectionOptions, ValueFormatterParams } from '@ag-grid-community/core';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { PeopleService } from '../shared/services/people.service';
import { People } from '../shared/services/people';
import { map, Observable } from 'rxjs';
import { CommonModule, formatCurrency } from '@angular/common';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';
import { CountryLogoRenderer } from './country-logo-renderer';
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  MenuModule,
  SparklinesModule,
  MultiFilterModule,
  SetFilterModule,
  ExcelExportModule,
]);

@Component({
  selector: 'ag-grid',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AgGridAngular, CommonModule, CountryLogoRenderer],
  templateUrl: './ag-grid.component.html',
  styleUrl: './ag-grid.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AgGridComponent implements OnInit {
  themeClass = 'ag-theme-quartz';
  private gridApi!: GridApi<People>;
  peopleService = inject(PeopleService);
  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
    groupSelects: "self",
  };
  rowGroupPanelShow: "always" | "onlyWhenGrouping" | "never" = "always";
  groupDisplayType: RowGroupingDisplayType = "multipleColumns";
  pagination = true;
  paginationPageSize = 50;
  autoGroupColumnDef: ColDef = {
    minWidth: 200,
    filter: "agGroupColumnFilter",
  };
  paginationPageSizeSelector = [10, 20, 50, 100];
  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true,
    editable: true,
    enableRowGroup: true,
  };
  rowData: People[] = [];
  colDefs: ColDef<People>[] = [
    {
      field: 'full_name', headerName: 'Contact Name', filter: "agTextColumnFilter", filterParams: {
        buttons: ['apply', 'clear'],
      } as INumberFilterParams
    },
    {
      field: 'job_title', headerName: 'Job Title', enableRowGroup: true, filter: "agTextColumnFilter", filterParams: {
        buttons: ['apply', 'clear'],
      } as INumberFilterParams
    },
    {
      field: 'country', headerName: 'Country',
      cellRenderer: CountryLogoRenderer,
      cellClass: "logoCell",
      minWidth: 50,
    },
    { field: 'is_online', headerName: 'Status' },
    {
      field: 'registered', headerName: 'Registered', cellDataType: 'date', filter: "agDateColumnFilter", filterParams: {
        buttons: ['apply', 'clear'],
      } as INumberFilterParams,
    },
    {
      field: 'target',
      headerName: 'Engagement',
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "bar",
          label: { enabled: true },
          valueAxisDomain: [0, 100],
        } as BarSparklineOptions,
      },
      filterParams: {
        buttons: ['apply', 'clear'],
      } as INumberFilterParams
    },
    { field: 'budget', filter: "agNumberColumnFilter", filterParams: {
      buttons: ['apply' , 'clear' ],
    } as INumberFilterParams, headerName: 'Budget', valueFormatter: currencyFormatter },
    { field: 'phone', headerName: 'Phone', filter: "agTextColumnFilter", filterParams: {
      buttons: ['apply' , 'clear' ],
    } as INumberFilterParams },
    { field: 'address', headerName: 'Address', filter: "agTextColumnFilter", filterParams: {
      buttons: ['apply' , 'clear' ],
    } as INumberFilterParams },
  ];

  ngOnInit(): void {
    this.peopleService.getPeople().pipe(map(array => array.map((item) => ({
      ...item,
      target: Array.isArray(item.target) ? item.target : [item.target],
      registered: new Date(typeof item.registered === 'string' ? item.registered.replace(/ /g, '') : item.registered)
    }))))
      .subscribe((data) => this.rowData = data);
  }

  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  onGridReady(params: GridReadyEvent<People>) {
    this.gridApi = params.api;
  }
}

function currencyFormatter(params: ValueFormatterParams) {
  return formatCurrency(params.value, 'en_US', '$');
}
