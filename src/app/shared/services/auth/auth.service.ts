import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ICredentials, IHttpParams, IUser } from "../../interfaces";
import { HttpErrorFactory } from "../../lib/httpErrorFactory/HttpErrorFactory";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly endpoint = "account";

  constructor(private readonly httpService: HttpService) {}

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

    return this.httpService
      .get<ICredentials, IUser[]>(this.endpoint, params)
      .pipe(
        map((res) => {
          if (res.length) {
            const { email, name, id } = res[0];
            return { email, name, id };
          }

          throw new Error("Usuário não encontrado.");
        }),
        catchError(() => {
          const errors = HttpErrorFactory.build401HttpError([
            "Usuário não encontrado.",
          ]);

          return throwError(errors);
        })
      );
  }
}
