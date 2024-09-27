import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoUiComponent } from './kendo-ui.component';

describe('GridComponent', () => {
  let component: KendoUiComponent;
  let fixture: ComponentFixture<KendoUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KendoUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KendoUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
