import {Injectable} from "@angular/core";
import {AuthHttpService} from "./auth-http.service";
import {Login, Register} from "../interfaces/lofin.interface";
import {LocalStorageService} from "../../../services/local-storage.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserStore} from "../../../services/store/user.store";
import {AuthStatus} from "../../../services/store/interface/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly authHttpService: AuthHttpService,
              private readonly localStorageService: LocalStorageService,
              private readonly router: Router,
              private readonly alertService: AlertService,
              private readonly userStore: UserStore
  ) {
  }

  signIn(data: Login
  ) {
    this.authHttpService.signIn(data).subscribe({
      next: ({body}) => {
        if (body === null) return
        const {token, email, name, id} = body
        this.localStorageService.setItem('access_token', token)
        this.userStore.updateUserInfo({email: email, id: id, name: name, token: token, status: AuthStatus.SUCCESS})
        this.router.navigate(['/'])
      }, error: (err: HttpErrorResponse) => {
        this.alertService.showedAlert({message: err.message})
      }
    })
  }

  register(data: Register) {
    this.authHttpService.register(data).subscribe({
      next: (val) => {
        // this.router.navigate(['/auth/login'])
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showedAlert({message: err.error.message})
      }
    })
  }


}
