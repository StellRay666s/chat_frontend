import {Injectable} from "@angular/core";
import {LocalStorageService} from "../../../../../services/local-storage.service";

@Injectable({
  providedIn:'root'
})
export class ChatWindowService{

  constructor(private readonly localStorageService: LocalStorageService){}

}
