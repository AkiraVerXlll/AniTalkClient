import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SignInFormComponent} from "./forms/sign-in-form.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'auth-page',
    standalone: true,
    imports: [RouterOutlet, SignInFormComponent],
    templateUrl: './auth-page.component.html',
    styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {

    constructor(private _routerOutlet: RouterOutlet) {

    }
}