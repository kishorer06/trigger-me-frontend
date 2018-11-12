import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { EmployeeEntryService } from './employee-entry.service';
import { Employee } from '../../model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-employee-entry',
    templateUrl: './employee-entry.component.html',
    styleUrls: ['./employee-entry.component.scss'],
    animations: [routerTransition()]
})
export class EmployeeEntryComponent implements OnInit {
    _date: any;
    constructor(private fb: FormBuilder, private emplService: EmployeeEntryService) { }
    employeeEntryForm: FormGroup;
    employeeEntry: Employee = new Employee();

    employeeList;

    submitted = false;

    ngOnInit() {
        this.employeeEntryForm = this.fb.group({
            empFName: ['', [Validators.required, Validators.minLength(2)]],
            empLName: ['', [Validators.required, Validators.minLength(2)]],
            phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            email: ['', [Validators.required, Validators.email]],
            status: ['', [Validators.required, Validators.minLength(3)]],
            statusStartDate: [null, [Validators.required]],
            statusEndDate: [null, [Validators.required]],
            projectStartDate: [null, [Validators.required]],
            projectEndDate: [null, [Validators.required]],
            empStartDate: [null, [Validators.required]],
            empEndDate: [null, [Validators.required]],
            isEmpEVerifyStatus: [false, [Validators.required]]
        })

        this.getEmployees();
    }

    // convenience getter for easy access to form fields
    get efb() { return this.employeeEntryForm.controls; }

    empEntry() {
        this.submitted = true;
        if (this.employeeEntryForm.valid) {
            this.employeeEntry.isEmpEVerifyStatus = (this.employeeEntryForm.controls.isEmpEVerifyStatus.value === 'true') ? true : false;
            this.employeeEntry.statusStartDate = this.formatDate(this.employeeEntryForm.controls.statusStartDate.value);
            this.employeeEntry.statusEndDate = this.formatDate(this.employeeEntryForm.controls.statusEndDate.value);
            this.employeeEntry.projectStartDate = this.formatDate(this.employeeEntryForm.controls.projectStartDate.value);
            this.employeeEntry.projectEndDate = this.formatDate(this.employeeEntryForm.controls.projectEndDate.value);
            this.employeeEntry.empStartDate = this.formatDate(this.employeeEntryForm.controls.empStartDate.value);
            this.employeeEntry.empEndDate = this.formatDate(this.employeeEntryForm.controls.empEndDate.value);
            this.emplService.saveEmployeeService(this.employeeEntry).subscribe(res => {
                console.log('Saved Employee', res);
                this.getEmployees();
            }, (_err: HttpErrorResponse) => {
            });
            this.onReset();

        }
    }

    getEmployees() {
        this.emplService.getEmployeesService().subscribe(res => {
            this.employeeList = res;
        }, (_err: HttpErrorResponse) => {

        });
    }

    formatDate(_date) {
        var formattedDate = JSON.stringify(_date.year) + "-" + JSON.stringify(_date.month) + "-" + JSON.stringify(_date.day);
        return formattedDate;
    }

    onReset() {
        this.submitted = false;
        this.employeeEntryForm.reset();
    }

    onEmpEdit(_empEditRow) {
        console.log("Edit empl row::::::", _empEditRow);
        this.emplService.editEmpService(_empEditRow).subscribe(res => {
            console.log("Successfully edited::::", res);

        }, (_err: HttpErrorResponse) => {
            console.error("Failed to edit::::", _err);
        });
    }

    onEmpDelete(_empDelRow) {
        console.log("Delete empl row::::::", _empDelRow);
        this.emplService.deleteEmpService(_empDelRow.empId).subscribe(res => {
            console.log("Successfully deleted::::", res);
            this.getEmployees();
        }, (_err: HttpErrorResponse) => {
            console.error("Failed to delete::::", _err);
        });
    }
}
