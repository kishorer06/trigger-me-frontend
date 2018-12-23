import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard, AuthService, UserService } from './shared';
import { TokenInterceptor } from '../app/shared/interceptor';
import { AppComponent } from './app.component';
import { EmployeeEntryService } from './layout/employees/employee-entry.service';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { InformationModalComponent } from './modals/information-modal/information-modal.component';
import { NgbModule } from '../../node_modules/@ng-bootstrap/ng-bootstrap';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '../../dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        HttpClientModule,
        HttpModule,
        NgbModule.forRoot(),
        AppRoutingModule
    ],
    declarations: [AppComponent, SuccessModalComponent, ErrorModalComponent, InformationModalComponent],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }, AuthGuard, AuthService, UserService, EmployeeEntryService],
    bootstrap: [AppComponent],
    entryComponents: [
        SuccessModalComponent, InformationModalComponent, ErrorModalComponent
    ]
})
export class AppModule { }
