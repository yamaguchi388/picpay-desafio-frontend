import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { TASK_EMPTY } from "../../constants/task-empty.constant";
import { AppError } from "../../models/app-error.interface";
import { Task } from "../../models/task.interface";
import { TasksService } from "../../services/tasks/tasks.service";
import { Errors } from "../actions/error.actions";
import { CreateTask, CreateTaskSuccess, DeleteTask, DeleteTaskSuccess, UpdateTask, UpdateTaskSuccess } from "../actions/task.actions";
import { AddTasks, LoadTasks } from "../actions/tasks.actions";

@Injectable()
export class TasksEffects {
    loadTasks = createEffect(() => this.actions$.pipe(
        ofType(LoadTasks),
        switchMap(({ page, limit, username }) => this.tasksService.getTasks(page, limit, username)
            .pipe(
                map((response: HttpResponse<Task[]>) => {
                    const total: number = Number(response.headers.get('X-Total-Count'))

                    if(response.body.length < 1) {
                        return AddTasks({ payload: [ TASK_EMPTY ], total });
                    }
                    else {
                        return AddTasks({ payload: response.body, total });
                    }
                }),
                catchError((e) => {
                    let error: AppError = {
                        description: e.message,
                        where: 'TasksEffects:loadTasks' 
                    };

                    this.errorStore.dispatch(Errors({ payload: error }))
                    return EMPTY;
                })
            )
        )
    ));

    createTask = createEffect(() => this.actions$.pipe(
        ofType(CreateTask),
        switchMap(({ task }) => this.tasksService.createTask(task)
            .pipe(
                map((task: Task) => CreateTaskSuccess({ task })),
                catchError((e) => {
                    let error: AppError = {
                        description: e.message,
                        where: 'TasksEffects:createTask' 
                    };

                    this.errorStore.dispatch(Errors({ payload: error }))
                    return EMPTY;
                })
            )
        )
    ));

    updateTask = createEffect(() => this.actions$.pipe(
        ofType(UpdateTask),
        switchMap(({ task }) => this.tasksService.updateTask(task)
            .pipe(
                map((task: Task) => UpdateTaskSuccess({ task })),
                catchError((e) => {
                    let error: AppError = {
                        description: e.message,
                        where: 'TasksEffects:updateTask' 
                    };

                    this.errorStore.dispatch(Errors({ payload: error }))
                    return EMPTY;
                })
            )
        )
    ));

    deleteTask = createEffect(() => this.actions$.pipe(
        ofType(DeleteTask),
        switchMap(({ id }) => this.tasksService.deleteTask(id)
            .pipe(
                map(() => DeleteTaskSuccess()),
                catchError((e) => {
                    let error: AppError = {
                        description: e.message,
                        where: 'TasksEffects:deleteTask' 
                    };

                    this.errorStore.dispatch(Errors({ payload: error }))
                    return EMPTY;
                })
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private errorStore: Store<{ error: AppError }>,
        private tasksService: TasksService
    ) { }
}