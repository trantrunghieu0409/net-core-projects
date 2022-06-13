import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaintainanceShiftComponent } from './create-maintainance-shift.component';

describe('CreateMaintainanceShiftComponent', () => {
  let component: CreateMaintainanceShiftComponent;
  let fixture: ComponentFixture<CreateMaintainanceShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMaintainanceShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaintainanceShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
