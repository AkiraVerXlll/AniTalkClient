import {UrlPatterns} from "../settings/url-patterns";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {debounceTime, map, Observable} from "rxjs";
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable()
export class BaseValidatorsService {
    constructor(private _http: HttpClient) {
    }

    addExistValidator = (control: AbstractControl,
                         apiUrl: string,
                         minStringLength: number,
                         errorMessage: string,
                         debounceTimeMs: number = 500): void => {
        control.valueChanges
            .pipe(debounceTime(debounceTimeMs))
            .subscribe((newValue => {
                if (!newValue && newValue.length <= minStringLength) return;
                this.ExistValidator(newValue, apiUrl, errorMessage)
                    .subscribe((possibleValidationError) => {
                        if (possibleValidationError)
                            control.setErrors(possibleValidationError);
                    });
            }));
    }

    private ExistValidator = (newValue: string | null, apiUrl: string, errorMessage: string): Observable<ValidationErrors | null> => {
        return this._http.get<boolean>(UrlPatterns.BaseUrl + apiUrl + newValue)
            .pipe(map((isExist) => isExist ? {isExist: errorMessage} : null));
    }
}