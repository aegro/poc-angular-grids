import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  AddEvent,
  CancelEvent,
  DataBindingDirective,
  EditEvent,
  ExcelModule,
  GridComponent,
  GridDataResult,
  GridModule,
  PDFModule,
  RemoveEvent,
  SaveEvent,
} from '@progress/kendo-angular-grid';
import { SVGIcon, filePdfIcon, fileExcelIcon } from '@progress/kendo-svg-icons';
import { process, State } from '@progress/kendo-data-query';
import { images } from './images';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ChartsModule } from "@progress/kendo-angular-charts";
import { CommonModule } from '@angular/common';
import { PeopleService } from '../shared/services/people.service';
import { map, Observable } from 'rxjs';
import { People } from '../shared/services/people';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kendo-ui',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GridModule, ChartsModule, InputsModule, PDFModule, ExcelModule, CommonModule],
  providers: [PeopleService],
  templateUrl: './kendo-ui.component.html',
  styleUrl: './kendo-ui.component.css',
})
export class KendoUiComponent {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridView!: unknown[];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;

  private peopleService = inject(PeopleService);
  public view: Observable<GridDataResult> | undefined;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };
  public formGroup!: any;

  // private editService: EditService;
  private editedRowIndex!: number | undefined;

  public ngOnInit(): void {
    this.peopleService.getPeople().pipe(map(array => array.map((item) => ({ 
      ...item, 
      // target: Array.isArray(item.target) ? item.target : [item.target],
      registered: typeof item.registered === 'string' ? new Date(item.registered.replace(/ /g,'')) : item.registered
    })))).subscribe((data) => this.gridView = data);
    
  }

  public photoURL(dataItem: { img_id: string; gender: string }): string {
    const code: string = dataItem.img_id + dataItem.gender.split('').shift()?.toUpperCase();
    const image: { [Key: string]: string } = images;

    return image[code];
  }

  public flagURL(dataItem: { country: string }): string {
    const code: string = dataItem.country;
    const image: { [Key: string]: string } = images;

    return image[code];
  }


  public onStateChange(state: State): void {
    this.gridState = state;

    // this.editService.read();
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      ProductID: new FormControl(),
      ProductName: new FormControl("", Validators.required),
      UnitPrice: new FormControl(0),
      UnitsInStock: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]{1,3}"),
        ])
      ),
      Discontinued: new FormControl(false),
    });
    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }

  public editHandler(args: EditEvent): void {
    // define all editable fields validators and default values
    const { dataItem } = args;
    this.closeEditor(args.sender);

    this.formGroup = new FormGroup({
      full_name: new FormControl(dataItem.full_name),
      job_title: new FormControl(dataItem.job_title, Validators.required),
      country: new FormControl(dataItem.country),
      is_online: new FormControl(dataItem.is_online),
      registered: new FormControl(dataItem.registered),
      target: new FormControl(dataItem.target),
      budget: new FormControl(dataItem.budget),
      phone: new FormControl(dataItem.phone),
      address: new FormControl(dataItem.address),
      
    });

    this.editedRowIndex = args.rowIndex;
    // put the row in edit mode, with the `FormGroup` build above
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const product: People[] = formGroup.value;

    // this.editService.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    // remove the current dataItem from the current data source,
    // `editService` in this example
    // this.editService.remove(args.dataItem);
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
