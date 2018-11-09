import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../../../assets/api.constants';

@Injectable()
export class EmployeeEntryService {

    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    saveEmployee(empl) {
        return this.http.post(this.apiUrl + ApiConstants.saveEmployee, JSON.stringify(empl));
    }

    getEmployees() {
        return this.http.get(this.apiUrl + ApiConstants.getEmployees);
    }
}
