import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiServer: string = environment.apiTask;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public getAllTasks(numberPage?, itemPerPage?): Observable<Task[]> {
    let params = new HttpParams();
    if(numberPage && itemPerPage){
      params = params.set('?_page', numberPage);
      params = params.set('_limit', itemPerPage);
    }
    return this.httpClient.get<Task[]>(this.apiServer + params.toString());
  }

  public getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.apiServer + '/' + id);
  }

  public postTask(payment: object): Observable<object> {
    return this.httpClient.post<object>(this.apiServer, JSON.stringify(payment), this.httpOptions);
  }

  public updateTask(id: number, payment: object): Observable<object> {
    return this.httpClient.patch<object>(this.apiServer + '/' + id, JSON.stringify(payment), this.httpOptions);
  }

  public deleteTask(id: number): Observable<Task> {
    return this.httpClient.delete<Task>(this.apiServer + '/' + id, this.httpOptions);
  }

}
