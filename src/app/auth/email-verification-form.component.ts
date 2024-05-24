import {Component} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component(
    {
        selector: 'email-verification-form',
        standalone: true,
        templateUrl: './email-verification-form.component.html',
        imports: [
            FormsModule,
            NgIf,
            ReactiveFormsModule,
            RouterLink
        ],
        styleUrl: './auth-form.component.scss'
    }
)
export class EmailVerificationComponent {
    constructor() {
    }

    public verifyEmail = () => {
    }
}