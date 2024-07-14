import {Component} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {FormComponent} from "../../Ui/form/form.component";
import {InputComponent} from "../../../../UI/input/input.component";
import {ButtonComponent} from "../../../../UI/button/button.component";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private readonly authService: AuthService) {
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('repeatPassword')!.value
    return pass === confirmPass ? null : {notSame: true}
  }

  registerForm = new FormGroup({
    email: new FormControl('dasd@email.ru', [Validators.email, Validators.required]),
    name: new FormControl('11111111', [Validators.minLength(4), Validators.required]),
    password: new FormControl('11111111', [Validators.minLength(8), Validators.required]),
    repeatPassword: new FormControl('11111111', [Validators.required])
  }, {validators: this.checkPasswords})


  onSubmit(data: any) {
    const {password, email, name} = this.registerForm.getRawValue()
    if (password === null || email === null || name === null) return
    this.authService.register({password, email, name})
  }


  checkFormValid() {
    return this.registerForm.status === 'INVALID'
  }

}
