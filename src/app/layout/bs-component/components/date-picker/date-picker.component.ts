import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatePickerComponent),
        multi: true
    }]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
    constructor() { }
    @Input() label: string;
    @Input() placeholder: string;
    @Input() dpName: string;

    ngOnInit() {
    }
    _value = '';

    propagateChange: any = () => { };

    propagateTouched: any = () => { };

    writeValue(value: any) {
        if (value) {
            this._value = value;
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(_fn) {
        this.propagateTouched = _fn;
    }

    onChange(event) {
        this.propagateChange(event.target.value);
    }
}
