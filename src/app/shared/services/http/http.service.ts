import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IHttpParams } from "../../interfaces";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  get<REQ, RES>(endpoint: string, params: IHttpParams[]): Observable<RES> {
    const url = this.buildUrl(endpoint, params);
    return this.httpClient.get<RES>(url);
  }

  private buildUrl(endpoint: string, params: IHttpParams[]): string {
    const urlParams = this.buildQueryParams(params);
    return `${this.apiUrl}/${endpoint}?${urlParams.toString()}`;
  }

  private buildQueryParams(params: IHttpParams[]) {
    const urlParams = new URLSearchParams();

    params.forEach(({ key, value }) => {
      urlParams.set(key, value);
    });

    return urlParams;
  }
}
