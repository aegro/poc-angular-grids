import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AngularLogo } from './shared/angular-logo/angular-logo';
import { AgGridComponent } from './ag-grid/ag-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularLogo, AgGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'poc-angular-grids';
}
