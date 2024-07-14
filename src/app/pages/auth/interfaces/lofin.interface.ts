import {AuthStatus} from "../../../services/store/interface/user.interface";

export interface Login {
  email: string | null,
  password: string | null
}

export interface Register{
  email:string,
  name:string,
  password:string
}

export interface IUserStore extends LoginResponse{
  status:AuthStatus
}

export interface LoginResponse {
  id:number,
  email: string,
  name: string,
  token: string
}
