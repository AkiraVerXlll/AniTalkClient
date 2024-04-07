import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'auth-form',
    standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgIf],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.scss'
    })
export class AuthFormComponent {
  isSignIn: boolean = true;

  toggleSignIn = () => {
    this.isSignIn = !this.isSignIn;
  }
}