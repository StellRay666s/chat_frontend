import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalComponent} from "../../UI/modal/modal.component";
import {InputComponent} from "../../UI/input/input.component";
import {ButtonComponent} from "../../UI/button/button.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SocketService} from "./service/socket/socket.service";
import {UserStore} from "../../services/store/user.store";
import {RoomsComponent} from "./components/rooms/rooms.component";
import {ChatWindowComponent} from "./components/chat-window/chat-window.component";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    RoomsComponent,
    ChatWindowComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {


  constructor(private readonly socketService: SocketService,
              private readonly userStore: UserStore,
              private readonly localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.getTokenFromStorage()
    this.socketService.connection()
  }


  getTokenFromStorage() {
    const token = this.localStorageService.getItem('access_token');
    this.userStore.setToken(token ?? '')
  }

  ngOnDestroy() {
    this.socketService.disconnect()
  }

}
