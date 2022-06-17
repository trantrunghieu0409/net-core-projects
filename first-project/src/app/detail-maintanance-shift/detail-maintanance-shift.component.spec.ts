import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMaintananceShiftComponent } from './detail-maintanance-shift.component';

describe('DetailMaintananceShiftComponent', () => {
  let component: DetailMaintananceShiftComponent;
  let fixture: ComponentFixture<DetailMaintananceShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMaintananceShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMaintananceShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
