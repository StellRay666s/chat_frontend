import {Injectable} from "@angular/core";
import {BaseHttpService} from "./base-http.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: "root"
})
export class CustomHttpService extends BaseHttpService {
 protected baseUrl = ''

  constructor(protected override readonly httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = environment.API_URL
  }


}
