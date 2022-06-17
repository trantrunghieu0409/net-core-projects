import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintainanceShiftComponent } from './edit-maintainance-shift.component';

describe('EditMaintainanceShiftComponent', () => {
  let component: EditMaintainanceShiftComponent;
  let fixture: ComponentFixture<EditMaintainanceShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMaintainanceShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaintainanceShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
