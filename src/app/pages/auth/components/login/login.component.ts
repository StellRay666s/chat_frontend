import {Component} from '@angular/core';
import {FormComponent} from "../../Ui/form/form.component";
import {ButtonComponent} from "../../../../UI/button/button.component";
import {InputComponent} from "../../../../UI/input/input.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomInputAccessorDirective} from "../../../../directives/custom-input-accessor.directive";
import {RouterLink} from "@angular/router";
import {FormErrorPipe} from "../../pipes/form-error.pipe";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    CustomInputAccessorDirective,
    RouterLink,
    FormErrorPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService) {
  }

  loginForm = new FormGroup({
    email: new FormControl('email@email.ru', [Validators.email, Validators.required]),
    password: new FormControl('password', [Validators.required])
  })


  onSubmit() {
    const {password, email} = this.loginForm.getRawValue()
    if (password === null && email === null) return
    this.authService.signIn({password, email})
  }


  checkFormValid() {
    return this.loginForm.status === 'INVALID'
  }

}
