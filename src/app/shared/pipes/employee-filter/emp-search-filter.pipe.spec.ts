import { EmployeeSearchFilter } from "./emp-search-filter.pipe";

describe('EmployeeSearchFilter', () => {
    it('create an instance', () => {
        const pipe = new EmployeeSearchFilter();
        expect(pipe).toBeTruthy();
    });
});
