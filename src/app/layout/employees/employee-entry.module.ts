import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeEntryComponent } from './employee-entry.component';
import { EmployeeEntryModuleRoutingModule } from './employee-entry-routing.module';
import { BsComponentModule } from '../../layout/bs-component/bs-component.module';
import {
    DatePickerModule
} from '../../layout/bs-component/components/date-picker/date-picker.module';
import { PageHeaderModule, SharedPipesModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeEditFormModalComponent } from './employee-edit-form-modal/employee-edit-form-modal.component';
import { EmployeeCreateFormModalComponent } from './employee-create-form-modal/employee-create-form-modal.component';
import { InactiveEmployeesEmailFormComponent } from './inactive-employees-email-form/inactive-employees-email-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        DatePickerModule,
        EmployeeEntryModuleRoutingModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        PageHeaderModule,
        SharedPipesModule,
        BsComponentModule],
    declarations: [
        EmployeeEntryComponent,
        EmployeeEditFormModalComponent,
        EmployeeCreateFormModalComponent,
        InactiveEmployeesEmailFormComponent
    ],
    entryComponents: [
        EmployeeEditFormModalComponent,
        EmployeeCreateFormModalComponent,
        InactiveEmployeesEmailFormComponent
    ]
})
export class EmployeeEntryModule { }
