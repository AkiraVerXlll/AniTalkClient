import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const form = control as FormGroup;
    return form.value['password'] === form.value['confirmPassword'] ? null :
        {PasswordDoNotMatch: 'Passwords do not match'};
}

export const passwordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const password = control.value;
    const possibleErrors = [
        {regexp: /.{6,}/g, message: 'The password must contain at least 6 symbols'},
        {regexp: /(?=.*[A-Z])/g, message: 'The password must contain at least one uppercase letter'},
        {regexp: /(?=.*[a-z])/g, message: 'The password must contain at least one lowercase letter'},
        {regexp: /(?=.*[0-9])/g, message: 'The password must contain at least one digit'},
        {regexp: /(?=.*\W)/g, message: 'The password must contain at least one special character.'},
    ];
    for (const error of possibleErrors) {
        if (!error.regexp.test(password)) {
            return {PasswordInvalid: error.message};
        }
    }
    return null;
}

export const usernameValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const username = control.value;
    const possibleErrors = [
        {regexp: /.{4,}/g, message: 'The username must contain at least 4 symbols'},
        {regexp: /.{0,20}/g, message: 'The username must contain at most 20 symbols'},
        {regexp: /^[a-zA-Z0-9.]+$/g, message: 'The username must contain only letters, digits and dots'},
    ];
    for (const error of possibleErrors) {
        if (!error.regexp.test(username)) {
            return {UsernameInvalid: error.message};
        }
    }
    return null;
}