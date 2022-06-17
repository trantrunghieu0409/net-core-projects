import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallerContainterComponent } from './smaller-containter.component';

describe('SmallerContainterComponent', () => {
  let component: SmallerContainterComponent;
  let fixture: ComponentFixture<SmallerContainterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallerContainterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallerContainterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
