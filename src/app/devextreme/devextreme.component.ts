import { Component, inject, OnInit } from '@angular/core';
import { DxButtonModule, DxCheckBoxModule, DxSparklineModule } from 'devextreme-angular';

import DataSource from 'devextreme/data/data_source';
import { DxBulletModule, DxTemplateModule } from 'devextreme-angular';
import { DxDataGridModule, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { PeopleService } from '../shared/services/people.service';
import { People } from '../shared/services/people';
import { images } from '../images';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { DxoHeaderFilterComponent } from 'devextreme-angular/ui/nested';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
// Our demo infrastructure requires us to use 'file-saver-es'. We recommend that you use the official 'file-saver' package in your applications.
import { exportDataGrid as excelExporter } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as pdfExporter } from 'devextreme/pdf_exporter';


@Component({
  selector: 'devextreme',
  standalone: true,
  imports: [CommonModule, DxButtonModule, DxDataGridModule, DxCheckBoxModule, DxBulletModule, DxTemplateModule, DxSparklineModule, DxButtonModule],
  templateUrl: './devextreme.component.html',
  styleUrl: './devextreme.component.css'
})
export class DevExtremeComponent implements OnInit {
  peopleService = inject(PeopleService);
  dataSource!: People[];

  showFilterRow = true;

  showHeaderFilter = true;

  applyFilterTypes = [{
    key: 'auto',
    name: 'Immediately',
  }, {
    key: 'onClick',
    name: 'On Button Click',
  }];

  saleAmountHeaderFilter: DxoHeaderFilterComponent['dataSource'] = [{
    text: 'Less than $3000',
    value: ['SaleAmount', '<', 3000],
  }, {
    text: '$3000 - $5000',
    value: [
      ['SaleAmount', '>=', 3000],
      ['SaleAmount', '<', 5000],
    ],
  }, {
    text: '$5000 - $10000',
    value: [
      ['SaleAmount', '>=', 5000],
      ['SaleAmount', '<', 10000],
    ],
  }, {
    text: '$10000 - $20000',
    value: [
      ['SaleAmount', '>=', 10000],
      ['SaleAmount', '<', 20000],
    ],
  }, {
    text: 'Greater than $20000',
    value: ['SaleAmount', '>=', 20000],
  }];

  currentFilter = this.applyFilterTypes[0].key;

  collapsed = false;

  ngOnInit(): void {
    this.peopleService.getPeople().pipe(map(array => array.map((item) => ({ 
      ...item, 
      // target: Array.isArray(item.target) ? item.target : [item.target],
      registered: typeof item.registered === 'string' ? item.registered.replace(/ /g,'') : item.registered
    })))).subscribe((data) => this.dataSource = data);
    
  }

  onExcelExporting(e: DxDataGridTypes.ExportingEvent) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    excelExporter({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer: any) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'data.xlsx');
      });
    });
  }


  onPdfExporting(e: DxDataGridTypes.ExportingEvent) {
    const doc = new jsPDF();
    pdfExporter({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save('data.pdf');
    });
  }

  contentReady = (e: DxDataGridTypes.ContentReadyEvent) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  customizeTooltip = ({ originalValue }: Record<string, string>) => ({ text: `${parseInt(originalValue)}%` });

  public flagURL(dataItem: { country: string }): string {
    const code: string = dataItem.country;
    const image: { [Key: string]: string } = images;

    return image[code];
  }

}
