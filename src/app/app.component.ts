import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthPageComponent} from "./auth/auth-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthPageComponent],
  template: `
    <router-outlet></router-outlet> 
  `
})
export class AppComponent {
}
