import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SignInFormComponent} from "./forms/sign-in-form.component";

@Component({
    selector: 'auth-page',
    standalone: true,
    imports: [RouterOutlet, SignInFormComponent],
    template: '<div class="auth-page">' +
        '<router-outlet></router-outlet>' +
        '</div>',
    styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

}