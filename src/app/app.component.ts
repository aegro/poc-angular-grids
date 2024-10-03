import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TextBoxModule, TextAreaModule, NumericTextBoxModule, MaskedTextBoxModule, SliderModule, UploaderModule, ColorPickerModule, SignatureModule, RatingModule, OtpInputModule, SmartTextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule, ComboBoxModule, AutoCompleteModule, MultiSelectModule, ListBoxModule, DropDownTreeModule, MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { RouterOutlet } from '@angular/router';

import { AngularLogo } from './shared/angular-logo/angular-logo';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { KendoUiComponent } from './kendo-ui/kendo-ui.component';
import { SyncfusionComponent } from './syncfusion/syncfusion.component';
import { DevExtremeComponent } from './devextreme/devextreme.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TextBoxModule, TextAreaModule, NumericTextBoxModule, MaskedTextBoxModule, SliderModule, UploaderModule, ColorPickerModule, SignatureModule, RatingModule, OtpInputModule, SmartTextAreaModule, DropDownListModule, ComboBoxModule, AutoCompleteModule, MultiSelectModule, ListBoxModule, DropDownTreeModule, MentionModule, RouterOutlet, AngularLogo, AgGridComponent, KendoUiComponent, SyncfusionComponent, DevExtremeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'poc-angular-grids';
}
