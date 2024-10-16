import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncfusionComponent } from './syncfusion.component';

describe('SyncfusionComponent', () => {
  let component: SyncfusionComponent;
  let fixture: ComponentFixture<SyncfusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyncfusionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncfusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
