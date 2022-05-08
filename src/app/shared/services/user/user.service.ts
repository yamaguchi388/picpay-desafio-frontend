import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { StorageKeysEnum } from "../../enums";
import { IUser } from "../../interfaces";
import { HttpService } from "../http/http.service";
import { StorageService } from "../storage/storage.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly endpoint = "account";

  constructor(
    private readonly storageService: StorageService,
    private httpService: HttpService
  ) {}

  setUserOnSession(user: IUser): void {
    this.storageService.setItem(StorageKeysEnum.USER, user);
  }

  getLoggedUser(): IUser {
    return this.storageService.getItem(StorageKeysEnum.USER);
  }

  update(user: IUser) {
    return this.httpService.put<IUser>(this.endpoint, user.id, user).pipe(
      catchError(() => {
        throw new HttpErrorResponse({
          error: ["Usuário não encontrado"],
        });
      })
    );
  }
}
