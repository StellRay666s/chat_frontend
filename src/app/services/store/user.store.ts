import {Injectable} from "@angular/core";
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {IUserStore, LoginResponse} from "../../pages/auth/interfaces/lofin.interface";
import {AuthStatus} from "./interface/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private userInfo = new BehaviorSubject<IUserStore>({
    id: 0,
    email: '',
    token: '',
    name: '',
    status: AuthStatus.DEFAULT
  })

  updateUserInfo(data: Partial<IUserStore>) {
    this.userInfo.next({...this.userInfo.getValue(), ...data})
  }

  setToken(token: string) {
    return this.userInfo.next({...this.userInfo.getValue(), token: token})
  }


  getToken() {
    return this.userInfo.getValue().token
  }

  getId() {
    return this.userInfo.getValue().id
  }


}
