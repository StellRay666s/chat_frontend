import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {InputComponent} from "./UI/input/input.component";
import {ButtonComponent} from "./UI/button/button.component";
import {AlertComponent} from "./UI/alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainComponent, InputComponent, ButtonComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat_proj';
}
