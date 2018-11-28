import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreateFormModalComponent } from './employee-create-form-modal.component';

describe('EmployeeCreateFormModalComponent', () => {
  let component: EmployeeCreateFormModalComponent;
  let fixture: ComponentFixture<EmployeeCreateFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCreateFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
