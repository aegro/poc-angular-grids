import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevExtremeComponent } from './devextreme.component';

describe('DevExtremeComponent', () => {
  let component: DevExtremeComponent;
  let fixture: ComponentFixture<DevExtremeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevExtremeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevExtremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
