import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee, EmployeeStatus } from '../../../model';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
    selector: 'app-employee-edit-form-modal',
    templateUrl: './employee-edit-form-modal.component.html',
    styleUrls: ['./employee-edit-form-modal.component.scss']
})
export class EmployeeEditFormModalComponent implements OnInit {
    @Input() title: string;
    @Input() id: number;
    @Input() public employeeEdit;
    @Output() passEmployeeEdit: EventEmitter<any> = new EventEmitter();
    submitted = false;
    selectedOptId: number;
    selectedStatus;
    employeeEditModel: Employee = new Employee();
    statusOptions = [
        new EmployeeStatus(1, 'F1'),
        new EmployeeStatus(2, 'H1-B'),
        new EmployeeStatus(3, 'E-3')
    ];
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private utilsService: UtilsService
    ) {
    }

    employeeEditForm: FormGroup;
    ngOnInit() {
        // this.selectedStatus = new EmployeeStatus(this.employeeEdit.status);
        this.employeeEditForm = this.formBuilder.group({
            empFName: [this.employeeEdit.empFName, [Validators.required, Validators.minLength(2)]],
            empLName: [this.employeeEdit.empLName, [Validators.required, Validators.minLength(2)]],
            phoneNumber: [this.employeeEdit.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            email: [this.employeeEdit.email, [Validators.required, Validators.email]],
            // status: [this.employeeEdit.status, [Validators.required, Validators.minLength(3)]],
            statusStartDate: [this.utilsService.formatDateToDatePicker(this.employeeEdit.statusStartDate), [Validators.required]],
            statusEndDate: [this.utilsService.formatDateToDatePicker(this.employeeEdit.statusEndDate), [Validators.required]],
            projectStartDate: [this.utilsService.formatDateToDatePicker(this.employeeEdit.projectStartDate), [Validators.required]],
            projectEndDate: [this.utilsService.formatDateToDatePicker(this.employeeEdit.projectEndDate), [Validators.required]],
            empStartDate: [this.utilsService.formatDateToDatePicker(this.employeeEdit.empStartDate), [Validators.required]],
            empEndDate: [this.utilsService.formatDateToDatePicker(this.employeeEdit.empEndDate), [Validators.required]],
            empEVerifyStatus: [this.employeeEdit.empEVerifyStatus, [Validators.required]]
        })

        this.setSelectOption(this.employeeEdit.status);
    }

    get efb() { return this.employeeEditForm.controls; }

    onSelect(statusId) {
        this.selectedStatus = null;
        for (var i = 0; i < this.statusOptions.length; i++) {
            if (this.statusOptions[i].id === Number(statusId)) {
                this.selectedOptId = this.statusOptions[i].id;
                this.selectedStatus = this.statusOptions[i].status;
            }
        }
    }

    setSelectOption(status) {
        this.selectedStatus = null;
        for (var i = 0; i < this.statusOptions.length; i++) {
            if (this.statusOptions[i].status == status) {
                this.selectedOptId = this.statusOptions[i].id;
                this.selectedStatus = this.statusOptions[i].status;
            }
        }

    }

    passBackEmployeeEditForm() {
        this.submitted = true;
        if (this.employeeEditForm.valid) {
            this.employeeEditModel.empId = this.employeeEdit.empId;
            this.employeeEditModel.empFName = this.employeeEditForm.controls.empFName.value;
            this.employeeEditModel.empLName = this.employeeEditForm.controls.empLName.value;
            this.employeeEditModel.phoneNumber = this.employeeEditForm.controls.phoneNumber.value;
            this.employeeEditModel.email = this.employeeEditForm.controls.email.value;
            this.employeeEditModel.status = this.selectedStatus;
            this.employeeEditModel.statusStartDate = this.employeeEditForm.controls.statusStartDate.value;
            this.employeeEditModel.statusEndDate = this.employeeEditForm.controls.statusEndDate.value;
            this.employeeEditModel.projectStartDate = this.employeeEditForm.controls.projectStartDate.value;
            this.employeeEditModel.projectEndDate = this.employeeEditForm.controls.projectEndDate.value;
            this.employeeEditModel.empStartDate = this.employeeEditForm.controls.empStartDate.value;
            this.employeeEditModel.empEndDate = this.employeeEditForm.controls.empEndDate.value;
            this.employeeEditModel.isEmpEVerifyStatus = this.employeeEditForm.controls.empEVerifyStatus.value;
            this.passEmployeeEdit.emit(this.employeeEditModel);
        }
    }

}
