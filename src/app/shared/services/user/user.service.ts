import { Injectable } from "@angular/core";
import { StorageKeysEnum } from "../../enums";
import { IUser } from "../../interfaces";
import { StorageService } from "../storage/storage.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private readonly storageService: StorageService) {}

  setUserOnSession(user: IUser): void {
    this.storageService.setItem(StorageKeysEnum.USER, user);
  }

  getLoggedUser(): IUser {
    return this.storageService.getItem(StorageKeysEnum.USER);
  }
}
