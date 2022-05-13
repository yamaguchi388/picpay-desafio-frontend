import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  public baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  public get<T>(action: string) {
    return this.httpClient.get<T>(`${this.baseUrl}/${action}`);
  }

  public post<T>(action: string, body: any) {
    return this.httpClient.post<T>(`${this.baseUrl}/${action}`, body);
  }

  public put<T>(action: string, body: any) {
    return this.httpClient.put<T>(`${this.baseUrl}/${action}`, body);
  }

  public patch<T>(action: string, body: any) {
    return this.httpClient.patch<T>(`${this.baseUrl}/${action}`, body);
  }

  public delete<T>(action: string, body: any) {
    return this.httpClient.delete<T>(`${this.baseUrl}/${action}`);
  }
}
