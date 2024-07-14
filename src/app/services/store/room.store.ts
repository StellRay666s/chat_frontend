import {Injectable} from "@angular/core";
import {BehaviorSubject, filter, of} from "rxjs";
import {IMessage, IRoom, IRoomStore} from "./interface/room.interface";

@Injectable({
  providedIn: 'root'
})
export class RoomStore {
  private roomStore = new BehaviorSubject<IRoomStore>({
    selectedRoom: 0,
    roomsList: [],
    roomMessages: []
  })


  updateSelectedRoom(roomId: number) {
    this.roomStore.next({...this.roomStore.getValue(), selectedRoom: roomId})
  }

  setListMessage(messages:IMessage[]){
    this.roomStore.next({...this.roomStore.getValue(), roomMessages: messages})
  }

  updateSelectedRoomId(roomId: number) {
    this.roomStore.next({...this.roomStore.getValue(), selectedRoom: roomId})
  }

  setRoomList(list:IRoom[]) {
    this.roomStore.next({...this.roomStore.getValue(), roomsList: list})
  }

  updateLastMessageRoomList(roomId: number, message: IMessage) {
    const updateRoom = this.roomStore.getValue().roomsList.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          message: message.message
        }
      } else {
        return room
      }
    })
    this.roomStore.getValue().roomMessages.push(message)

    this.roomStore.next({...this.roomStore.getValue(), roomsList: updateRoom})

  }


  getValueByKey(key: keyof IRoomStore) {
    return this.roomStore.value[key]
  }

  getObservable() {
    return this.roomStore
  }

}
