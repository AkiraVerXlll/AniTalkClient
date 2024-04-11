import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthFormValidators} from "../services/auth-form-validator.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UrlPatterns} from "../../settings/url-patterns";

@Component({
    selector: 'auth-forms',
    standalone: true,
    imports: [RouterOutlet, NgOptimizedImage, NgIf, ReactiveFormsModule, HttpClientModule, RouterLink],
    providers: [AuthFormValidators, FormBuilder],
    templateUrl: './sign-up-form.component.html',
    styleUrl: './auth-form.component.scss'
})
export class SignUpFormComponent {

    constructor(
        private _fb: FormBuilder,
        private _authFormValidators: AuthFormValidators,
        private _http: HttpClient,
        private _router: Router) {
    }

    public signUpForm = this._fb.group({
            username: ['',
                [Validators.required, this._authFormValidators.usernameValidator],
                this._authFormValidators.usernameExistValidator],
            email: ['', [Validators.required, Validators.email],
                this._authFormValidators.emailExistValidator],
            password: ['', [Validators.required, this._authFormValidators.passwordValidator]],
            confirmPassword: ['', Validators.required]
        },
        {validators: this._authFormValidators.confirmPasswordValidator}
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
                    console.log(err);
                }
            });
    }
}