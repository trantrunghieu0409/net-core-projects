import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmboxComponent } from './confirmbox.component';

describe('ConfirmboxComponent', () => {
  let component: ConfirmboxComponent;
  let fixture: ComponentFixture<ConfirmboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
