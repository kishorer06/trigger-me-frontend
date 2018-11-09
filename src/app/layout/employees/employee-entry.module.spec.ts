import { EmployeeEntryModule } from './employee-entry.module';

describe('EmployeeEntryModule', () => {
  let employeeEntryModule: EmployeeEntryModule;

  beforeEach(() => {
    employeeEntryModule = new EmployeeEntryModule();
  });

  it('should create an instance', () => {
    expect(employeeEntryModule).toBeTruthy();
  });
});
