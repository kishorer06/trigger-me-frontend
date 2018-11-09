import { TestBed } from '@angular/core/testing';

import { EmployeeEntryService } from './employee-entry.service';

describe('EmployeeEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeEntryService = TestBed.get(EmployeeEntryService);
    expect(service).toBeTruthy();
  });
});
