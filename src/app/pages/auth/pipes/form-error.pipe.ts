import { Pipe, PipeTransform } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";

@Pipe({
  name: 'formError',
  standalone: true
})
export class FormErrorPipe implements PipeTransform {

  transform(value: FormControl | null, field: string): unknown {
  return ''
  }

}
