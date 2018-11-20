import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { EmployeeEntryService } from './employee-entry.service';
import { Employee } from '../../model';
import { HttpErrorResponse } from '@angular/common/http';
import { InformationModalComponent } from "../../modals/information-modal/information-modal.component";
import { SuccessModalComponent } from '../../modals/success-modal/success-modal.component';
import { EmployeeEditFormModalComponent } from './employee-edit-form-modal/employee-edit-form-modal.component';

@Component({
    selector: 'app-employee-entry',
    templateUrl: './employee-entry.component.html',
    styleUrls: ['./employee-entry.component.scss'],
    animations: [routerTransition()]
})
export class EmployeeEntryComponent implements OnInit {
    _date: any;
    constructor(private fb: FormBuilder, private emplService: EmployeeEntryService, private ngModal: NgbModal) { }
    employeeEntryForm: FormGroup;
    employeeEntry: Employee = new Employee();
    employeeList;
    title: string;
    closeResult: string;
    submitted = false;
    isSpinner = true;
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
            this.emplService.saveEmployeeService(this.employeeEntry).subscribe(_res => {
                this.getEmployees();
            }, (_err: HttpErrorResponse) => {
            });
            this.onReset();

        }
    }

    getEmployees() {
        this.emplService.getEmployeesService().subscribe(res => {
            this.isSpinner = false;
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

    saveEmpEdit(_empEditRow) {
        this.emplService.editEmpService(_empEditRow).subscribe(_res => {
            const modalRef = this.ngModal.open(SuccessModalComponent);
            modalRef.componentInstance.message = `Successfully updated ${_empEditRow.email} profile.`;
            this.getEmployees();
        }, (_err: HttpErrorResponse) => {
        });
    }

    onEmpDelete(_empDelRow) {
        this.emplService.deleteEmpService(_empDelRow.empId).subscribe((res: any) => {
            if (res.message == 'Success') {
                const modalRef = this.ngModal.open(SuccessModalComponent);
                modalRef.componentInstance.message = `Successfully deleted ${_empDelRow.email} profile.`;
                this.getEmployees();
            }
        }, (_err: HttpErrorResponse) => {
        });
    }

    empEditOpen(_empl) {
        this.title = "Edit Employee Profile";
        const modalRef = this.ngModal.open(EmployeeEditFormModalComponent);
        modalRef.componentInstance.title = 'Edit Employee';
        modalRef.componentInstance.id = 10;
        modalRef.componentInstance.employeeEdit = _empl;
        modalRef.componentInstance.passEmployeeEdit.subscribe((updateEmpRecord) => {
            updateEmpRecord.statusStartDate = this.formatDate(updateEmpRecord.statusStartDate);
            updateEmpRecord.statusEndDate = this.formatDate(updateEmpRecord.statusEndDate);
            updateEmpRecord.projectStartDate = this.formatDate(updateEmpRecord.projectStartDate);
            updateEmpRecord.projectEndDate = this.formatDate(updateEmpRecord.projectEndDate);
            updateEmpRecord.empStartDate = this.formatDate(updateEmpRecord.empStartDate);
            updateEmpRecord.empEndDate = this.formatDate(updateEmpRecord.empEndDate);
            modalRef.close();
            this.saveEmpEdit(updateEmpRecord);
        })
    }

    empDeleteOpen(_empl) {
        this.title = "Employee Profile Delete";
        const modalRef = this.ngModal.open(InformationModalComponent);
        modalRef.componentInstance.title = 'Delete Employee';
        modalRef.componentInstance.message = `Are you sure you want to delete ${_empl.email} profile. All information associated to this user profile will be permanently deleted.This operation can not be undone.`;
        modalRef.result.then((result) => {
            if (result === 'Ok') {
                this.onEmpDelete(_empl);
            }
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
