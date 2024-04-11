import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthFormValidators} from "../services/auth-form-validator.service";
@Component({
    selector: 'auth-form',
    standalone: true,
    imports: [RouterOutlet, NgOptimizedImage, NgIf, ReactiveFormsModule],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {

    constructor(
        private _fb: FormBuilder,
        private _authFormValidators: AuthFormValidators) {
    }

    isSignIn: boolean = true;

    public signInForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required]]
        }
    )

    public signUpForm = this._fb.group({
            username: ['', [Validators.required, this._authFormValidators.usernameValidator]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, this._authFormValidators.passwordValidator]],
            confirmPassword: ['', Validators.required]
        },
        {validators: this._authFormValidators.confirmPasswordValidator}
    )

    submit = () => {

    }

    toggleSignIn = () => {
        this.isSignIn ?
            this.signInForm.reset() :
            this.signUpForm.reset();
        this.isSignIn = !this.isSignIn;
    }

    resetPassword = (): void => {

    }
}