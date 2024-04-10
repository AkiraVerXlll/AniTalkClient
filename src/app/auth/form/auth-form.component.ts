import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {confirmPasswordValidator, passwordValidator, usernameValidator} from "../services/auth-form-validators";

@Component({
    selector: 'auth-form',
    standalone: true,
    imports: [RouterOutlet, NgOptimizedImage, NgIf, ReactiveFormsModule],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {

    constructor(private _fb: FormBuilder) {
    }

    isSignIn: boolean = true;

    public signInForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required]]
        }
    )

    public signUpForm = this._fb.group({
            username: ['', [Validators.required, usernameValidator]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, passwordValidator]],
            confirmPassword: ['', Validators.required]
        },
        {validators: confirmPasswordValidator}
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