import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'auth-component',
    standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
    })
export class AuthComponent {

}