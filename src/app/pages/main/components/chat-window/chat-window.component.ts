import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgStyle} from "@angular/common";
import {interval, take} from "rxjs";
import {RoomStore} from "../../../../services/store/room.store";
import {SocketService} from "../../service/socket/socket.service";
import {UserStore} from "../../../../services/store/user.store";

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    FormsModule,
    NgStyle,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {

  constructor(private readonly roomStoreService: RoomStore,
              private readonly webSocketService: SocketService,
              private readonly userStoreService: UserStore,
  ) {
  }


  value = ''
  roomStore$ = this.roomStoreService.getObservable()
  userId  = this.userStoreService


  changed() {
  }

  click() {
    const text = this.value
    console.log(this.value)
    const selectedRoom = this.roomStoreService.getValueByKey('selectedRoom')! as number
    this.webSocketService.postMessage(selectedRoom, this.value)

  }

  protected readonly localStorage = localStorage;
  protected readonly Number = Number;
}
