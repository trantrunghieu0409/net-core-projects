import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerWithSidebarComponent } from './container-with-sidebar.component';

describe('ContainerWithSidebarComponent', () => {
  let component: ContainerWithSidebarComponent;
  let fixture: ComponentFixture<ContainerWithSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerWithSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerWithSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
