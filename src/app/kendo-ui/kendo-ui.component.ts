import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  DataBindingDirective,
  ExcelModule,
  GridModule,
  PDFModule,
} from '@progress/kendo-angular-grid';
import { SVGIcon, filePdfIcon, fileExcelIcon } from '@progress/kendo-svg-icons';
import { process } from '@progress/kendo-data-query';
import { employees } from './employees';
import { images } from './images';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ChartsModule } from "@progress/kendo-angular-charts";
import { CommonModule } from '@angular/common';
import { PeopleService } from '../shared/services/people.service';

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
  public gridData: unknown[] = employees;
  public gridView!: unknown[];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;

  private peopleService = inject(PeopleService);

  public ngOnInit(): void {
    this.peopleService.getPeople().subscribe(gridData => {
      this.gridView = gridData;
    })
  }

  public onFilter(value: Event): void {
    const inputValue = value;

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'full_name',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'job_title',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'budget',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'phone',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'address',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
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
}
