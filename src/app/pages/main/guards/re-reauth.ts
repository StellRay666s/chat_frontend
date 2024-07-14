import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {UserStore} from "../../../services/store/user.store";
import {AuthHttpService} from "../../auth/services/auth-http.service";
import {AuthStatus} from "../../../services/store/interface/user.interface";


export const reReauth = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthHttpService)
  const userStore = inject(UserStore)
  const router = inject(Router)

  authService.reAuth().subscribe({
    next: ({body}) => {
      if (!body) return
      const {token, email, name, id} = body
      userStore.updateUserInfo({email: email, id: id, name: name, token: token, status: AuthStatus.SUCCESS})
      return true
    }, error: err => {
      userStore.updateUserInfo({email: '', id: 0, name: '', token: '', status: AuthStatus.FORBIDDEN})
      router.navigate(['auth/login'])
      return false
    }
  })


}
