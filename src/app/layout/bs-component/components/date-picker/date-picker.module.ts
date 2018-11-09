import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    DatePickerComponent,
} from '../../components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        DatePickerComponent
    ],
    exports: [DatePickerComponent]
})
export class DatePickerModule { }
