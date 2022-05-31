import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { TaskParams } from '../models/task-params.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiURL = environment.baseURL + '/tasks';

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  getAll(parameters?: TaskParams): Observable<Task[]> {
    const params = new HttpParams({ fromObject: { ...parameters } });
    return this.httpClient.get<Task[]>(this.apiURL, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.snackbarService.openSnackBar('Erro ao buscar pagamentos', null);
        return throwError(error);
      })
    );
  }

  getTotalCount(parameters: Partial<Task>): Observable<number> {
    const params = new HttpParams({ fromObject: { ...parameters } });
    return this.httpClient
      .get<Task[]>(this.apiURL, { params })
      .pipe(map((tasks) => tasks.length));
  }

  create(payload: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.apiURL, payload).pipe(
      tap(() => {
        this.snackbarService.openSnackBar(
          'Pagamento adicionado com sucesso!',
          null
        );
      }),
      catchError((error: HttpErrorResponse) => {
        this.snackbarService.openSnackBar('Erro ao adicionar pagamento', null);
        return throwError(error);
      })
    );
  }

  update({ id, ...payload }: Partial<Task>): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.apiURL}/${id}`, payload).pipe(
      tap(() => {
        this.snackbarService.openSnackBar(
          'Pagamento editado com sucesso!',
          null
        );
      }),
      catchError((error: HttpErrorResponse) => {
        this.snackbarService.openSnackBar('Erro ao editar pagamento', null);
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`).pipe(
      tap(() => {
        this.snackbarService.openSnackBar(
          'Pagamento deletado com sucesso!',
          null
        );
      }),
      catchError((error: HttpErrorResponse) => {
        this.snackbarService.openSnackBar('Erro ao deletar pagamento', null);
        return throwError(error);
      })
    );
  }
}
