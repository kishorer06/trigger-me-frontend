import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveEmployeesModalComponent } from './inactive-employees-modal.component';

describe('InactiveEmployeesModalComponent', () => {
  let component: InactiveEmployeesModalComponent;
  let fixture: ComponentFixture<InactiveEmployeesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveEmployeesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveEmployeesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
