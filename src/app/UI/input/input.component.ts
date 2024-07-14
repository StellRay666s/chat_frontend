import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent  implements ControlValueAccessor  {
  @Input()
  label = ''

  private _value = '';

  get value() {
    return this._value;
  }

  @Input()
  placeholder:string = ''

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  onChange(_: any) {}
  onTouched: any = () => {};
  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn:any) {
    this.onChange = fn;
  }

  registerOnTouched(fn:any) {
    this.onTouched = fn;
  }
}

