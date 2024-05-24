import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn
} from "@angular/forms";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UrlPatterns} from "../../settings/url-patterns";
import {BaseValidatorsService} from "../../global-services/base-validators.service";
import {debounce, debounceTime, map, Observable, throttleTime} from "rxjs";

@Injectable()
export class AuthFormValidators {
    constructor(private _http: HttpClient,
                private _baseValidators: BaseValidatorsService) {
    }

    private _confirmPasswordPossibleErrors = [
        {regexp: /^.{6,}$/g, message: 'The password must contain at least 6 symbols'},
        {regexp: /^.{0,32}$/g, message: 'The password must contain at most 32 symbols'},
        {regexp: /(?=.*[A-Z])/g, message: 'The password must contain at least one uppercase letter'},
        {regexp: /(?=.*[a-z])/g, message: 'The password must contain at least one lowercase letter'},
        {regexp: /(?=.*[0-9])/g, message: 'The password must contain at least one digit'},
        {regexp: /(?=.*\W)/g, message: 'The password must contain at least one special symbol'},
    ];

    private _usernamePossibleErrors = [
        {regexp: /^.{4,}$/g, message: 'The username must contain at least 4 symbols'},
        {regexp: /^.{0,20}$/g, message: 'The username must contain at most 20 symbols'},
        {regexp: /^[a-zA-Z0-9.]+$/g, message: 'The username must contain only letters, digits and dots'},
    ];

    public addConfirmPasswordValidator  = (
        confirmPasswordControl: AbstractControl,
        passwordControl : AbstractControl
    ) : void => {
        confirmPasswordControl.valueChanges.subscribe(newValue => {
            if (newValue === '' || passwordControl.value === '') return;
            if (newValue !== passwordControl.value) {
                confirmPasswordControl.setErrors({PasswordDoNotMatch: 'Passwords do not match'});
            }
        });
        passwordControl.valueChanges.subscribe(password => {
            if (password === '' || confirmPasswordControl.value === '') return;
            if(confirmPasswordControl.value !== password ) {
                confirmPasswordControl.setErrors({PasswordDoNotMatch: 'Passwords do not match'});
            }
        });
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

    addUsernameExistValidator = (usernameControl: AbstractControl): void => {
        this._baseValidators.addExistValidator(
            usernameControl,
            UrlPatterns.UsernameIsExist,
            4,
            'Username is already taken');
    }

    addEmailExistValidator = (emailControl: AbstractControl): void => {
        this._baseValidators.addExistValidator(
            emailControl,
            UrlPatterns.EmailIsExist,
            2,
            'Email is already taken');
    }

}
