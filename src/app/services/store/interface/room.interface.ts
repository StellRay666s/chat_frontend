export interface IRoom {
  id: number;
  title: string;
  created_at: string;
  message: string;
}

export interface IMessage {
  userId: number,
  id: number,
  createdAt: string
  message: string,
  user: {
    id: number,
  }
  rooms: { id: number }
}

export interface IRoomStore {
  selectedRoom: number
  roomsList: IRoom[]
  roomMessages: IMessage[]
}
