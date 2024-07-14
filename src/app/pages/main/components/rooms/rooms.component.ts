import {Component} from '@angular/core';
import {RoomComponent} from "../../../../UI/room/room.component";
import {RoomStore} from "../../../../services/store/room.store";
import {AsyncPipe} from "@angular/common";
import {SocketService} from "../../service/socket/socket.service";

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    RoomComponent,
    AsyncPipe
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {

  constructor(private readonly roomStoreService: RoomStore, private readonly socketService: SocketService) {
  }

  roomsList$ = this.roomStoreService.getObservable()


  selectRoom(id: number) {
    if (id === this.roomStoreService.getValueByKey('selectedRoom')) return
    this.roomStoreService.updateSelectedRoomId(id)
    this.socketService.sendIdRoomForMessage(id)
  }


}
