import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMailComponent } from './list-mail.component';

describe('ListMailComponent', () => {
  let component: ListMailComponent;
  let fixture: ComponentFixture<ListMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
