import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


export abstract class BaseHttpService {

  protected abstract baseUrl: string

  constructor(protected readonly httpClient: HttpClient) {
  }


  get<T>(url: string) {
    return this.httpClient.get(`${this.baseUrl}url`)
  }

  post<T, K>(url: string, payload: T){
    return this.httpClient.post<K>(`${this.baseUrl}${url}`, payload, {observe: 'response'})
  }


}
