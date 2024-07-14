import {Directive, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomInputAccessorDirective),
  multi: true
};

@Directive({
  selector: '[appCustomInputAccessor]',
  host: {'(blur)': 'onTouched()'},
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  standalone: true
})
export class CustomInputAccessorDirective {

  constructor() { }

  private _value: any = '';

  public onChange: any = () => { /*Empty*/ }
  public onTouched: any = () => { /*Empty*/ }

  get value(): any { return this._value; };

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this._value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
