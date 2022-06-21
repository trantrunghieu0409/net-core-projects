import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListMailComponent } from './view-list-mail.component';

describe('ViewListMailComponent', () => {
  let component: ViewListMailComponent;
  let fixture: ComponentFixture<ViewListMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
