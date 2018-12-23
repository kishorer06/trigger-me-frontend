import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSearchFilter } from './employee-filter/emp-search-filter.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [EmployeeSearchFilter],
    exports: [EmployeeSearchFilter]
})
export class SharedPipesModule { }
