import { HttpService } from "@/app/core/infra/http.service";
import { Account } from "@/app/core/models/account";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  baseUrl = "account";
  constructor(private http: HttpService) {}

  public async authenticate({ email, password }) {
    const response = await this.http
      .get<Array<Account>>(
        `${this.baseUrl}?email=${email}&password=${password}`
      )
      .pipe(map((response) => response.map((account) => new Account(account))))
      .toPromise();
    const [account] = response;

    if (account) {
      localStorage.setItem("authenticated", "true");
      return true;
    }

    return false;
  }

  public logout(){
    localStorage.removeItem("authenticated");
  }
}
