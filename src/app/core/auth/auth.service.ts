import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { User } from "src/app/models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  BASE_URL = environment.baseURL;
  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }) {
    const params = new HttpParams();
    params.appendAll(payload);
    return this.http
      .get<User[]>(`${this.BASE_URL}/account`, { params })
      .pipe(map((result) => result[0]));
  }
}
