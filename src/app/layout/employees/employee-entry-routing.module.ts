import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeEntryComponent } from './employee-entry.component';

const routes: Routes = [
    {
        path: '', component: EmployeeEntryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeEntryModuleRoutingModule {
}
