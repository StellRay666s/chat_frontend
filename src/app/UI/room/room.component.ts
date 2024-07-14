import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {

  @Input()
  imageURl = ''

  @Input()
  title = 'Название'

  @Input()
  lastMessage = 'Последнее сообщение'

}
