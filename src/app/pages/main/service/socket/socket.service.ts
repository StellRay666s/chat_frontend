import {Injectable} from "@angular/core";
import {Socket, io} from "socket.io-client";
import {AlertService} from "../../../../services/alert.service";
import {SocketExceptionResponse} from "./types/socket.interaface";
import {Router} from "@angular/router";
import {RoomStore} from "../../../../services/store/room.store";
import {IMessage, IRoom} from "../../../../services/store/interface/room.interface";
import {UserStore} from "../../../../services/store/user.store";


@Injectable({providedIn: "root"})
export class SocketService {

  constructor(
    private readonly alertService: AlertService,
    private readonly router: Router,
    private readonly userStoreService: UserStore,
    private readonly roomStoreService: RoomStore,
  ) {
  }

  private socket!: Socket


  private join() {
    this.socket.emit('join', {userId: this.userStoreService.getId()})
  }

  private initialConnection() {
    this.socket = io('http://localhost:80/room', {
      transports: ['websocket'],

      auth: {
        access_token: `Bearer ${this.userStoreService.getToken()}`
      }
    })
  }


  connection() {
    this.initialConnection()
    this.join()
    this.error()
    this.roomData()
    this.getMessage()
    this.getMessageInRoom()
  }

  getMessageInRoom() {
    this.socket.on('message_to_client', (data: { message: IMessage, roomsId: number }) => {
      this.roomStoreService.updateLastMessageRoomList(data.roomsId, data.message)
    })


  }

  postMessage(id: number, text: string) {
    this.socket.emit('message', {roomId: id, message: text})
  }


  sendIdRoomForMessage(id: number) {
    this.socket.emit('get_message_room', {roomId: id})
  }

  disconnect() {
    this.socket.disconnect()
  }


  private roomData() {
    this.socket.on('rooms', (data: IRoom[]) => {

      this.roomStoreService.setRoomList(data)
    })
  }

  private getMessage() {
    this.socket.on('post_messages_room', (data: IMessage[]) => {
      this.roomStoreService.setListMessage(data)
    })
  }

  private error() {
    this.socket.on('exception', (data: SocketExceptionResponse) => {
      this.alertService.showedAlert({message: data.message})
      if (data.status === 401) this.router.navigate(['/auth/login'])
    })
  }

}
