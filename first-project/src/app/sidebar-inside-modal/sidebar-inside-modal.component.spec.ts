import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarInsideModalComponent } from './sidebar-inside-modal.component';

describe('SidebarInsideModalComponent', () => {
  let component: SidebarInsideModalComponent;
  let fixture: ComponentFixture<SidebarInsideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarInsideModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarInsideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
