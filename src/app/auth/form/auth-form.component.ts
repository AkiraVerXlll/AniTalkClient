import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'auth-form',
    standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.scss'
    })
export class AuthFormComponent {

}