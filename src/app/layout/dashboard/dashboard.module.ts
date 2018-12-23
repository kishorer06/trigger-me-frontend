import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { InactiveEmployeesModalComponent } from './inactive-employees-modal/inactive-employees-modal.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        DashboardRoutingModule,
        StatModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        InactiveEmployeesModalComponent
    ],
    entryComponents: [
        InactiveEmployeesModalComponent
    ]
})
export class DashboardModule { }
