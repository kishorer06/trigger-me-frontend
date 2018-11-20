import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared'
import { User } from "../model";
import {
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    user: User = new User();
    private _error = new Subject<string>();
    errorMessage: string;
    isLoading = false;
    constructor(public router: Router, public authService: AuthService, private fb: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        })
        this._error.subscribe((message) => this.errorMessage = message);
        this._error.pipe(
            debounceTime(1500)
        ).subscribe(() => this.errorMessage = null);
    }

    login() {
        this.isLoading = true;
        this.authService.logIn(this.user)
            .subscribe(_data => {
                this.isLoading = false;
                this.router.navigate(['/dashboard']);
            }, _err => {
                this.isLoading = false;
                if (_err.status == 401)
                    return this._error.next("Bad Credentials");
                return this._error.next(_err._body);

            }
            )
    }

}
