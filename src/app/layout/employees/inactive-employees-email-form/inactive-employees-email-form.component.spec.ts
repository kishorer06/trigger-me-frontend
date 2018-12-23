import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveEmployeesEmailFormComponent } from './inactive-employees-email-form.component';

describe('InactiveEmployeesEmailFormComponent', () => {
  let component: InactiveEmployeesEmailFormComponent;
  let fixture: ComponentFixture<InactiveEmployeesEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveEmployeesEmailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveEmployeesEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
