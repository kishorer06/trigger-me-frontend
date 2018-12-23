import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee, EmployeeStatus } from '../../../model';

@Component({
    selector: 'app-employee-create-form-modal',
    templateUrl: './employee-create-form-modal.component.html',
    styleUrls: ['./employee-create-form-modal.component.scss']
})
export class EmployeeCreateFormModalComponent implements OnInit {

    @Input() title: string;
    @Input() id: number;
    @Output() passEmployeeCreate: EventEmitter<any> = new EventEmitter();
    employeeEntryForm: FormGroup;
    employeeEntry: Employee = new Employee();
    submitted = false;
    selectedOptId: number = 1;
    selectedOptName: string = 'F1';
    statusOptions = [
        new EmployeeStatus(1, 'F1'),
        new EmployeeStatus(2, 'H1-B'),
        new EmployeeStatus(3, 'E-3')
    ];
    constructor(public activeModal: NgbActiveModal,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.employeeEntryForm = this.fb.group({
            empFName: ['', [Validators.required, Validators.minLength(2)]],
            empLName: ['', [Validators.required, Validators.minLength(2)]],
            phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            email: ['', [Validators.required, Validators.email]],
            statusStartDate: [null, [Validators.required]],
            statusEndDate: [null, [Validators.required]],
            projectStartDate: [null, [Validators.required]],
            projectEndDate: [null, [Validators.required]],
            empStartDate: [null, [Validators.required]],
            empEndDate: [null, [Validators.required]],
            isEmpEVerifyStatus: [false, [Validators.required]]
        })
    }

    onReset() {
        this.submitted = false;
        this.employeeEntryForm.reset();
        this.onSelect(1);
    }

    onSelect(statusId) {
        for (var i = 0; i < this.statusOptions.length; i++) {
            if (this.statusOptions[i].id === Number(statusId)) {
                this.selectedOptId = this.statusOptions[i].id;
                this.selectedOptName = this.statusOptions[i].status;
            }
        }
    }

    // convenience getter for easy access to form fields
    get efb() { return this.employeeEntryForm.controls; }

    passbackEmployeeCreateModel() {
        this.submitted = true;
        if (this.employeeEntryForm.valid) {
            this.submitted = false;
            this.employeeEntry.status = this.selectedOptName
            this.passEmployeeCreate.emit(this.employeeEntry);
        }
    }
}
