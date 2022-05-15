import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { StorageKeysEnum } from "../../enums";
import { ICredentials, IHttpParams, IUser } from "../../interfaces";
import { HttpService } from "../http/http.service";
import { StorageService } from "../storage/storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly endpoint = "account";

  constructor(
    private readonly httpService: HttpService,
    private readonly storageService: StorageService
  ) {}

  signIn({ email, password }: ICredentials): Observable<IUser> {
    const params: IHttpParams[] = [
      {
        key: "email",
        value: email,
      },
      {
        key: "password",
        value: password,
      },
    ];

    return this.httpService.get<IUser[]>(this.endpoint, params).pipe(
      map((res) => {
        if (res.length) {
          const { email, name, id } = res[0];
          return { email, name, id };
        }

        const errors = ["Usuário não encontrado."];

        throw new HttpErrorResponse({
          error: {
            status: HttpStatusCode.Unauthorized,
            errors,
          },
        });
      })
    );
  }

  logout() {
    this.storageService.removeItem(StorageKeysEnum.USER);
  }
}
