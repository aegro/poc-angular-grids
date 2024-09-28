import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { GroupService, SortService, GridComponent as Grid, EditService, ToolbarService, GridModule, PageService, FilterService, PagerModule, ColumnMenuService } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ChartModule, AccumulationChartModule, RangeNavigatorModule, SparklineModule, SmithchartModule, StockChartModule, BulletChartModule, Chart3DModule, CircularChart3DModule } from '@syncfusion/ej2-angular-charts';
import { PeopleService } from '../shared/services/people.service';
import { GridComponent, IFilter, VirtualScrollService, ExcelExportService } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBox  } from '@syncfusion/ej2-buttons';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import {CommonModule, NgIf} from '@angular/common';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { images } from '../images';
import { map } from 'rxjs';
import { ToolbarItems, ExcelExportProperties, ExportType, } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'syncfusion',
//   changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [GroupService, ToolbarService, SortService, EditService, PageService, FilterService, ExcelExportService, ColumnMenuService],
  imports: [CommonModule, DialogModule, ChartModule, AccumulationChartModule, RangeNavigatorModule, SparklineModule, SmithchartModule, StockChartModule, BulletChartModule, Chart3DModule, CircularChart3DModule, GridModule, PagerModule, SyncfusionComponent, DropDownListModule, GridModule, NgIf, RatingModule],
  templateUrl: './syncfusion.component.html',
  styleUrl: './syncfusion.component.css'
})
export class SyncfusionComponent {
  public data!: Object[];
  public groupOptions!: Object;
  public pageSettings!: Object;
  public filterSettings!: Object;
  public editSettings!: Object;
  public toolbar!: string[];
  public orderidrules!: Object;
  public customeridrules!: Object;
  public freightrules!: Object;
  public editparams!: Object;
  public formatoptions!: Object;
  public initialPage!: Object;
  public refresh!: Boolean;
  @ViewChild('grid')
  public grid!: Grid;
  @ViewChild('alertDialog')
  public alertDialog!: DialogComponent;
  public alertHeader: string = 'Grouping';
  public hidden: Boolean = false;
  public target: string = '.control-section';
  public alertWidth: string = '300px';
  public alertContent: string = 'Grouping is disabled for this column';
  public showCloseIcon: Boolean = false;
  public animationSettings: Object = { effect: 'None' };
  public alertDlgBtnClick = () => {
      this.alertDialog.hide();
  }
  public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];

  private peopleService = inject(PeopleService);

  public dReady: boolean = false;
  public dtTime: boolean = false;
  public isDataBound: boolean = false;
  public isDataChanged: boolean = true;
  public intervalFun: any;
  public clrIntervalFun: any;
  public clrIntervalFun1: any;
  public clrIntervalFun2: any;
  public stTime: any;
  public query!: Query;
  public selectionSettings!: Object;
  public loadingIndicator!: Object;
  public height: string = '240px';
  @ViewChild('sample')
  public listObj!: DropDownListComponent;
  @ViewChild('overviewgrid')
  public gridInstance!: GridComponent ;
  public ddlData: Object[] = [
      { text: '1,000 Rows and 11 Columns', value: '1000' },
      { text: '10,000 Rows and 11 Columns', value: '10000' },
      { text: '1,00,000 Rows and 11 Columns', value: '100000' }
  ];
  public fields: Object = { text: 'text', value: 'value' };
  public item: number[] = [1, 2, 3, 4, 5];
  public formatOptions!: Object;

  ngOnInit(): void {
      this.pageSettings = { pageCount: 50, pageSize: 50 };
      this.filterSettings = { type: 'Excel'};
      this.editSettings = { allowEditing: true };
      this.toolbar = ['Edit', 'Update', 'Cancel'];
      this.orderidrules = { required: true, number: true };
      this.customeridrules = { required: true };
      this.freightrules = { required: true };
      this.editparams = { params: { popupHeight: '300px' } };
      this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' };
      this.peopleService.getPeople().pipe(map(array => array.map((item) => ({ 
        ...item, 
        // target: Array.isArray(item.target) ? item.target : [item.target],
        registered: new Date(typeof item.registered === 'string' ? item.registered.replace(/ /g,'') : item.registered)
      })))).subscribe((data) => this.data = data);
      this.filterSettings = { type: "Menu" };
        this.loadingIndicator = {indicatorType: 'Shimmer'};
       this.stTime = performance.now();
        this.selectionSettings = {persistSelection: true, type: "Multiple", checkboxOnly: true };
        this.formatOptions = {type: 'date', format: 'dd/MM/yyyy', editType: 'DatepickerEdit'};
        this.groupOptions = { showGroupedColumn: true };
  }
  dataBound() {
      if(this.refresh){
        //   this.grid.groupColumn('ShipCountry');
          this.refresh =false;
      }
  }
  load() {
      this.refresh = (<any>this.grid).refreshing;
  }
  created() {
      this.grid.on("columnDragStart", this.columnDragStart, this);
  }
  public columnDragStart(args: any) {
      if(args.column.field === "OrderDate"){
          this.alertDialog.show();
     }
  }

  public flagURL(dataItem: { country: string }): string {
    const code: string = dataItem.country;
    const image: { [Key: string]: string } = images;

    return image[code];
  }

  public photoURL(dataItem: { img_id: string; gender: string }): string {
    const code: string = dataItem.img_id + dataItem.gender.split('').shift()?.toUpperCase();
    const image: { [Key: string]: string } = images;

    return image[code];
  }

}
