import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaintainComponent } from './list-maintain.component';

describe('ListMaintainComponent', () => {
  let component: ListMaintainComponent;
  let fixture: ComponentFixture<ListMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
