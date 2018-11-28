import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../../../assets/api.constants';

@Injectable()
export class EmployeeEntryService {

    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    saveEmployeeService(emp) {
        return this.http.post(this.apiUrl + ApiConstants.saveEmployee, JSON.stringify(emp));
    }

    getEmployeesService() {
        return this.http.get(this.apiUrl + ApiConstants.getEmployees);
    }

    deleteEmpService(_empId) {
        return this.http.delete(this.apiUrl + ApiConstants.deleteEmployee + "?empId=" + _empId);
    }

    editEmpService(emp) {
        return this.http.patch(this.apiUrl + ApiConstants.updateEmployee, JSON.stringify(emp));
    }

    getInactiveEmployeesService() {
        return this.http.get(this.apiUrl + ApiConstants.getInactiveEmployees);
    }
}
