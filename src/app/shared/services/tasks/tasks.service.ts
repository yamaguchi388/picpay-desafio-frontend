import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppError } from '../../models/app-error.interface';
import { Task } from '../../models/task.interface';
import { Errors } from '../../state-management/actions/error.actions';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  API = 'http://localhost:3000/tasks'

  constructor(
    private http: HttpClient,
    private errorStore: Store<{ error: AppError }>
  ) { }

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  getTasks(page: number, limit: number, username?: string): Observable<HttpResponse<Task[]>> {
    let params: HttpParams;

    if(username !== undefined) {
      params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit)
      .set('username', username)
    }
    else {
      params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit)
    }
    
    return this.http.get<Task[]>(this.API, {
      headers: this.httpHeaders,
      observe: 'response',
      params
    })
      .pipe(
        retry(3),
        catchError((e) => {
          const payload: AppError = {
            description: e.message,
            where: 'TasksService:getTasks'
          };

          this.errorStore.dispatch(Errors({ payload }))
          return throwError(e);
        })
      );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API, task, {
      headers: this.httpHeaders,
    })
      .pipe(
        retry(3),
        catchError((e) => {
          const payload: AppError = {
            description: e.message,
            where: 'TasksService:createTask'
          };

          this.errorStore.dispatch(Errors({ payload }))
          return throwError(e);
        })
      );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API}/${task.id}`, task, {
      headers: this.httpHeaders,
    })
      .pipe(
        retry(3),
        catchError((e) => {
          const payload: AppError = {
            description: e.message,
            where: 'TasksService:updateTask'
          };

          this.errorStore.dispatch(Errors({ payload }))
          return throwError(e);
        })
      );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<Task>(`${this.API}/${id}`, {
      headers: this.httpHeaders,
    })
      .pipe(
        retry(3),
        catchError((e) => {
          const payload: AppError = {
            description: e.message,
            where: 'TasksService:deleteTask'
          };

          this.errorStore.dispatch(Errors({ payload }))
          return throwError(e);
        })
      );
  }
}
