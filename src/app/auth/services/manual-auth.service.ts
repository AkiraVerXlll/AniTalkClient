import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";

Injectable()
export class ManualAuthService {
  constructor(
      private http: HttpClient) {}

  signIn = (email: string, password: string) => {
  }

  signUp = (email: string, password: string) => {
  }
}