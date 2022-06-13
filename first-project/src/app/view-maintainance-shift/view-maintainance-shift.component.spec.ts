import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintainanceShiftComponent } from './view-maintainance-shift.component';

describe('ViewMaintainanceShiftComponent', () => {
  let component: ViewMaintainanceShiftComponent;
  let fixture: ComponentFixture<ViewMaintainanceShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMaintainanceShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMaintainanceShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
