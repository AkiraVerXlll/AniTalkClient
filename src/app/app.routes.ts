import { Routes } from '@angular/router';
import {AuthPageComponent} from "./auth/auth-page.component";
import {SignInFormComponent} from "./auth/forms/sign-in-form.component";
import {SignUpFormComponent} from "./auth/forms/sign-up-form.component";

const AuthRoutes : Routes = [
    {path: 'sign-in', component: SignInFormComponent},
    {path: 'sign-up', component: SignUpFormComponent},
];
export const routes: Routes = [
    {path: 'auth', redirectTo: 'auth/sign-in'},
    {path: 'auth', component: AuthPageComponent, children: AuthRoutes}
];



