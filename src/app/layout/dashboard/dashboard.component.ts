import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeEntryService } from '../employees/employee-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InactiveEmployeesModalComponent } from './inactive-employees-modal/inactive-employees-modal.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    totalEmployeesLength = 0;
    totalInactiveEmployeesLength = 0;
    inactiveEmployees;
    employeeWord: string;
    employeeInactiveWord: string;

    constructor(private empService: EmployeeEntryService, private ngModal: NgbModal, public router: Router) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        this.getTotalEmployees();
        this.getInactiveEmployees();
    }

    getTotalEmployees() {
        this.empService.getEmployeesService().subscribe((res: any) => {
            if (res.length > 1)
                this.employeeWord = 'Employees';
            else
                this.employeeWord = 'Employee';
            this.totalEmployeesLength = res.length;
        }, (_err: HttpErrorResponse) => {
        });
    }

    getInactiveEmployees() {
        this.empService.getInactiveEmployeesService().subscribe((res: any) => {
            if (res.length > 1)
                this.employeeInactiveWord = 'Inactive employees';
            else
                this.employeeInactiveWord = 'Inactive employee';
            this.totalInactiveEmployeesLength = res.length;
            this.inactiveEmployees = res;
        }, (_err: HttpErrorResponse) => {
        });
    }

    openInactiveEmplModal() {
        const modalRef = this.ngModal.open(InactiveEmployeesModalComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.title = 'Inactive Employees';
        modalRef.componentInstance.id = 13;
        modalRef.componentInstance.inactiveEmployeeModal = this.inactiveEmployees;
    }

    goToEmplTable() {
        this.router.navigate(['/employee']);
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

}
