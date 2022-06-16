import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMaintainComponent } from './staff-maintain.component';

describe('StaffMaintainComponent', () => {
  let component: StaffMaintainComponent;
  let fixture: ComponentFixture<StaffMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
