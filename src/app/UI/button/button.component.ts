import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Output()
  onClick = new EventEmitter()

  @Input()
  disabled = false

  event() {
    this.onClick.emit()
  }

}
