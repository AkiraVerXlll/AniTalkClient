import {Directive, Input, ElementRef, Host, HostListener, Renderer2, OnInit,} from "@angular/core";
import {Observable} from "rxjs";
import {FormControlStatus} from "@angular/forms";


@Directive(
    {
        standalone: true,
        selector: '[invalidInput]'
    }
)
export class InvalidInputDirective implements OnInit{

    @Input('invalidInput')
    public formControlStatusObservable?: Observable<FormControlStatus>

    constructor(private _el: ElementRef,
                private _render: Renderer2) {
        this._render.addClass(this._el.nativeElement, 'input--valid');

    }

    ngOnInit(): void {
        this.formControlStatusObservable?.subscribe({
            next: (status) => {
                if (status === 'INVALID') {
                    this._render.removeClass(this._el.nativeElement, 'input--valid');
                    this._render.addClass(this._el.nativeElement, 'input--invalid');
                } else {
                    this._render.removeClass(this._el.nativeElement, 'input--invalid');
                    this._render.addClass(this._el.nativeElement, 'input--valid');
                }
            }
        });
    }

}
