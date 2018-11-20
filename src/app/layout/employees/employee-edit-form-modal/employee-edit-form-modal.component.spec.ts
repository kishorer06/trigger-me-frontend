import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditFormModalComponent } from './employee-edit-form-modal.component';

describe('EmployeeEditFormModalComponent', () => {
  let component: EmployeeEditFormModalComponent;
  let fixture: ComponentFixture<EmployeeEditFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEditFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
