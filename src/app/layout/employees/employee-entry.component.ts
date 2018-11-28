import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeEntryService } from './employee-entry.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InformationModalComponent } from "../../modals/information-modal/information-modal.component";
import { SuccessModalComponent } from '../../modals/success-modal/success-modal.component';
import { EmployeeEditFormModalComponent } from './employee-edit-form-modal/employee-edit-form-modal.component';
import { ErrorModalComponent } from '../../modals/error-modal/error-modal.component';
import { UtilsService } from '../../shared/services/utils.service';
import { EmployeeCreateFormModalComponent } from './employee-create-form-modal/employee-create-form-modal.component';


@Component({
    selector: 'app-employee-entry',
    templateUrl: './employee-entry.component.html',
    styleUrls: ['./employee-entry.component.scss'],
    animations: [routerTransition()]
})
export class EmployeeEntryComponent implements OnInit {
    _date: any;
    emptyEmpRecords: boolean;
    constructor(private emplService: EmployeeEntryService,
        private ngModal: NgbModal,
        private utilsService: UtilsService) { }
    employeeList;
    title: string;
    closeResult: string;
    submitted = false;
    isSpinner = true;
    ngOnInit() {
        this.getEmployees();
    }

    empEntry(addEmpRecord, modalRef) {
        this.emplService.saveEmployeeService(addEmpRecord).subscribe(_res => {
            modalRef.close();
            this.getEmployees();
        }, (_err: HttpErrorResponse) => {
        });
    }

    getEmployees() {
        this.emptyEmpRecords = false;
        this.emplService.getEmployeesService().subscribe(res => {
            this.isSpinner = false;
            this.employeeList = res;
            if (!(this.employeeList.length >= 1))
                this.emptyEmpRecords = true;
        }, (_err: HttpErrorResponse) => {
            this.isSpinner = false;
            const modalRef = this.ngModal.open(ErrorModalComponent);
            modalRef.componentInstance.message = `Oops! unable to load information. Please try again!`;
        });
    }

    saveEmpEdit(_empEditRow) {
        this.emplService.editEmpService(_empEditRow).subscribe(_res => {
            const modalRef = this.ngModal.open(SuccessModalComponent);
            modalRef.componentInstance.message = `Successfully updated ${_empEditRow.email} profile.`;
            this.getEmployees();
        }, (_err: HttpErrorResponse) => {
            const modalRef = this.ngModal.open(ErrorModalComponent);
            if (_err.status == 400) {
                modalRef.componentInstance.message = `Sorry unable to update ${_empEditRow.email} profile. Please check your inputs and try again!`;
            }
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
            updateEmpRecord.statusStartDate = this.utilsService.formatDate(updateEmpRecord.statusStartDate);
            updateEmpRecord.statusEndDate = this.utilsService.formatDate(updateEmpRecord.statusEndDate);
            updateEmpRecord.projectStartDate = this.utilsService.formatDate(updateEmpRecord.projectStartDate);
            updateEmpRecord.projectEndDate = this.utilsService.formatDate(updateEmpRecord.projectEndDate);
            updateEmpRecord.empStartDate = this.utilsService.formatDate(updateEmpRecord.empStartDate);
            updateEmpRecord.empEndDate = this.utilsService.formatDate(updateEmpRecord.empEndDate);
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

    openEmpCreateModal() {
        this.title = "Create Employee Profile";
        const modalRef = this.ngModal.open(EmployeeCreateFormModalComponent);
        modalRef.componentInstance.title = 'Create Employee';
        modalRef.componentInstance.id = 10;
        modalRef.componentInstance.passEmployeeCreate.subscribe((createEmpRecord) => {
            this.empEntry(createEmpRecord, modalRef);
        })
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
