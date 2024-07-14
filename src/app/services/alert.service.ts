import {Injectable} from "@angular/core";
import {BehaviorSubject, ReplaySubject} from "rxjs";

export interface Alert {
  isShow: boolean;
  message: string,
  timeClose:Date
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  visible = new ReplaySubject<Alert>()


  showedAlert({message}: Pick<Alert, 'message'>) {
    const timeEnd = new Date(new Date().setSeconds(new Date().getSeconds() + 3))

    this.visible.next({isShow: true, message: message, timeClose: timeEnd})
  }

}
