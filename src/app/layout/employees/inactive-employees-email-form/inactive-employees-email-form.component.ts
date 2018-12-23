import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Email } from '../../../model';

@Component({
    selector: 'app-inactive-employees-email-form',
    templateUrl: './inactive-employees-email-form.component.html',
    styleUrls: ['./inactive-employees-email-form.component.scss']
})
export class InactiveEmployeesEmailFormComponent implements OnInit {

    @Input() title: string;
    @Input() id: number;
    @Output() passBackInactiveEmpsEmailEmit: EventEmitter<any> = new EventEmitter();
    emailForm: FormGroup;
    submitted = false;
    emailModel: Email = new Email();


    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.emailForm = this.formBuilder.group({
            subject: ['', [Validators.required, Validators.minLength(6)]],
            message: ['', [Validators.required, Validators.minLength(15)]],
            toAddress: ['', [Validators.required, Validators.email]],
            priority: [false, [Validators.required]]
        })
    }
    get eif() { return this.emailForm.controls; }

    passBackInactiveEmpsEmailForm() {
        this.submitted = true;
        if (this.emailForm.valid) {
            this.submitted = false;
            this.passBackInactiveEmpsEmailEmit.emit(this.emailModel);
        }

    }
}
