import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-inactive-employees-modal',
    templateUrl: './inactive-employees-modal.component.html',
    styleUrls: ['./inactive-employees-modal.component.scss']
})
export class InactiveEmployeesModalComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal) { }
    @Input() title: string;
    @Input() id: number;
    @Input() public inactiveEmployeeModal;
    ngOnInit() {
    }

}
