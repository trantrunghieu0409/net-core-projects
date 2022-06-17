import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphInputComponent } from './paragraph-input.component';

describe('ParagraphInputComponent', () => {
  let component: ParagraphInputComponent;
  let fixture: ComponentFixture<ParagraphInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
