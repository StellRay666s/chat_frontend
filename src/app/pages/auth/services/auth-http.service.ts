import {Injectable} from "@angular/core";
import {CustomHttpService} from "../../../services/http/custom-http.service";
import {Login, LoginResponse, Register} from "../interfaces/lofin.interface";
import {catchError, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {LocalStorageService} from "../../../services/local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private readonly httpCustomService: CustomHttpService, private readonly localStorageService: LocalStorageService) {
  }

  signIn(data: Login) {
    return this.httpCustomService.post<Login, LoginResponse>('auth/sign-in', data)
  }

  register(data: Register) {
    return this.httpCustomService.post<Register, any>('auth/register', data)
  }

  reAuth() {
    const token = this.localStorageService.getItem('access_token')
    return this.httpCustomService.post<any, LoginResponse>('auth/re-auth', token)

  }


}
