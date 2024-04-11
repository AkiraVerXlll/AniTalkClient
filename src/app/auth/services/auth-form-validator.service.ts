import {
    AbstractControl,
    AsyncValidator,
    AsyncValidatorFn,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn
} from "@angular/forms";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UrlPatterns} from "../../settings/url-patterns";
import {map, Observable} from "rxjs";

@Injectable()
export class AuthFormValidators {
    constructor(private _http: HttpClient) {
    }

    private _confirmPasswordPossibleErrors = [
        {regexp: /^.{6,}$/g, message: 'The password must contain at least 6 symbols'},
        {regexp: /^.{0,32}$/g, message: 'The password must contain at most 32 symbols'},
        {regexp: /(?=.*[A-Z])/g, message: 'The password must contain at least one uppercase letter'},
        {regexp: /(?=.*[a-z])/g, message: 'The password must contain at least one lowercase letter'},
        {regexp: /(?=.*[0-9])/g, message: 'The password must contain at least one digit'},
        {regexp: /(?=.*\W)/g, message: 'The password must contain at least one special character.'},
    ];

    private _usernamePossibleErrors = [
        {regexp: /^.{4,}$/g, message: 'The username must contain at least 4 symbols'},
        {regexp: /^.{0,20}$/g, message: 'The username must contain at most 20 symbols'},
        {regexp: /^[a-zA-Z0-9.]+$/g, message: 'The username must contain only letters, digits and dots'},
    ];

    confirmPasswordValidator: ValidatorFn = (
        control: AbstractControl
    ): ValidationErrors | null => {
        const form = control as FormGroup;
        const password = form.value['password'];
        const confirmPassword = form.value['confirmPassword'];
        if (!password || !confirmPassword) return null;
        return form.value['password'] === form.value['confirmPassword'] ? null :
            {PasswordDoNotMatch: 'Passwords do not match'};
    }

    passwordValidator: ValidatorFn = (
        control: AbstractControl
    ): ValidationErrors | null => {
        const password = control.value;
        if (!password) return null;
        for (const error of this._confirmPasswordPossibleErrors) {
            if (!password.match(error.regexp)) {
                return {PasswordInvalid: error.message};
            }
        }
        return null;
    }

    usernameValidator: ValidatorFn = (
        control: AbstractControl
    ): ValidationErrors | null => {
        const username = control.value;
        if (!username) return null;
        for (const error of this._usernamePossibleErrors) {
            if (!username.match(error.regexp)) {
                return {UsernameInvalid: error.message};
            }
        }
        return null;
    }

    usernameExistValidator: AsyncValidatorFn = (
        control: AbstractControl
    ): Observable<ValidationErrors | null> => {
        const username = control.value;
        return this._http
            .get<boolean>(UrlPatterns.BaseUrl + UrlPatterns.UsernameIsExist + username)
            .pipe(map((isExist : boolean) =>
                 isExist ?
                    {UsernameExist: 'The username is already exist'} :
                    null
            ));
    }

    emailExistValidator: AsyncValidatorFn = (
        control: AbstractControl
    ): Observable<ValidationErrors | null> => {
        const email = control.value;
        return this._http
            .get<boolean>(UrlPatterns.BaseUrl + UrlPatterns.EmailIsExist + email)
            .pipe(map((isExist : boolean) =>
                 isExist ?
                    {EmailExist: 'The email is already exist'} :
                    null
            ));
    }
}
