import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainanceShiftComponent } from './maintainance-shift.component';

describe('MaintainanceShiftComponent', () => {
  let component: MaintainanceShiftComponent;
  let fixture: ComponentFixture<MaintainanceShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainanceShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainanceShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
