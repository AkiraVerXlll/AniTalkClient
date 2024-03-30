import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthFormComponent} from "./form/auth-form.component";

@Component({
    selector: 'auth-page',
    standalone: true,
    imports: [RouterOutlet, AuthFormComponent],
    template: '<div class="auth-page"><auth-form></auth-form></div>',
    styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

}