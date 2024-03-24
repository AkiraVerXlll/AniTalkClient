import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthComponent],
  template: `
    <auth-component></auth-component>
  `
})
export class AppComponent {
}
