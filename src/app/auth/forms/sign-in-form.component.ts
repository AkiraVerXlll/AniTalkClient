import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthFormValidators} from "../services/auth-form-validator.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
    selector: 'auth-forms',
    standalone: true,
    imports: [RouterOutlet, NgOptimizedImage, NgIf, ReactiveFormsModule, HttpClientModule, RouterLink],
    providers: [AuthFormValidators, FormBuilder],
    templateUrl: './sign-in-form.component.html',
    styleUrl: './auth-form.component.scss'
})
export class SignInFormComponent {

    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        private _router: Router) {
    }

    public signInForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required]]
        }
    )

    private signIn = () => {

    }

    resetPassword = (): void => {
    }
}