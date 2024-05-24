import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthFormValidators} from "../services/auth-form-validator.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UrlPatterns} from "../../settings/url-patterns";
import {BaseValidatorsService} from "../../global-services/base-validators.service";
import {InvalidInputDirective} from "../directives/invalid-input.directive";

@Component({
    selector: 'auth-forms',
    standalone: true,
    imports: [RouterOutlet, NgOptimizedImage, NgIf, ReactiveFormsModule, HttpClientModule, RouterLink, InvalidInputDirective],
    providers: [AuthFormValidators, FormBuilder, BaseValidatorsService],
    templateUrl: './sign-up-form.component.html',
    styleUrl: './auth-form.component.scss'
})
export class SignUpFormComponent implements OnInit{

    constructor(
        private _fb: FormBuilder,
        private _authFormValidators: AuthFormValidators,
        private _http: HttpClient,
        private _router: Router) {
    }

    ngOnInit() {
        const emailControl = this.signUpForm.get('email');
        const usernameControl = this.signUpForm.get('username');
        const passwordControl = this.signUpForm.get('password');
        const confirmPasswordControl = this.signUpForm.get('confirmPassword');
        this._authFormValidators.addUsernameExistValidator(usernameControl as any);
        this._authFormValidators.addEmailExistValidator(emailControl as any);
        this._authFormValidators.addConfirmPasswordValidator(confirmPasswordControl as any, passwordControl as any);
    }

    public signUpForm = this._fb.group({
            username: ['',
                [Validators.required, this._authFormValidators.usernameValidator]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, this._authFormValidators.passwordValidator]],
            confirmPassword: ['', Validators.required]
        }
    )

    public signUp = () => {
        const body = {
            "email": this.signUpForm.get('email')?.value,
            "username": this.signUpForm.get('username')?.value,
            "password": this.signUpForm.get('password')?.value
        }
        this._http
            .post(UrlPatterns.BaseUrl + UrlPatterns.ManualSignUp, body)
            .subscribe({
                next: (res) => {
                    this._router.navigate(["/auth/sign-in"]);
                },
                error: (err) => {
                    this._router.navigate(["/error-page"]);
                }
            });
    }
}