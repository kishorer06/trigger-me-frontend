import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

    @Input() message;

    constructor(public activeModal: NgbActiveModal) { }


    ngOnInit() {
    }

}
