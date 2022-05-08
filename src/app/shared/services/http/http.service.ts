import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHttpParams } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  get<RES>(endpoint: string, params?: IHttpParams[]): Observable<RES> {
    const url = this.buildUrl(endpoint, params);
    return this.httpClient.get<RES>(url);
  }

  private buildUrl(endpoint: string, params?: IHttpParams[]): string {
    if (params?.length) {
      const urlParams = this.buildQueryParams(params);
      return `${this.apiUrl}/${endpoint}?${urlParams.toString()}`;
    }

    return `${this.apiUrl}/${endpoint}`;
  }

  private buildQueryParams(params: IHttpParams[]) {
    const urlParams = new URLSearchParams();

    params?.forEach(({ key, value }) => {
      urlParams.set(key, value);
    });

    return urlParams;
  }

  getFullResponse<RES>(
    endpoint: string,
    params?: IHttpParams[]
  ): Observable<HttpResponse<RES>> {
    const url = this.buildUrl(endpoint, params);
    return this.httpClient.get<RES>(url, { observe: 'response' });
  }

  post<R>(endpoint: string, payload: R): Observable<R> {
    const url = this.buildUrl(endpoint);
    return this.httpClient.post<R>(url, payload);
  }

  put<R>(endpoint: string, id: number, payload: R): Observable<R> {
    const url = `${this.buildUrl(endpoint)}/${id}`;
    return this.httpClient.put<R>(url, payload);
  }

  delete(endpoint: string, id: number): Observable<void> {
    const url = `${this.buildUrl(endpoint)}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
