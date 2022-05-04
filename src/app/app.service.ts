import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from './classes/Task';
import { Account } from './classes/Account';

@Injectable({
    providedIn: 'root'
})
 
export class AppService {

    private apiUrl = 'http://localhost:3000/'

    constructor(private http: HttpClient) { }

    getAccountByEmailAndPassword(email: string, password: string): Promise<Account> {
        return new Promise ((resolve, reject) => {
            this.http.get<Account[]>(this.apiUrl + 'account?email=' + email + '&password=' + password).subscribe(
                success => {
                    resolve(success[0]);
                },
                error => {
                    reject(error);
                }
            )
        })
    }

    getTasks(queryParams?: string): Promise<Task[]> {
        if (!queryParams) {
            queryParams = '';
        }

        return new Promise ((resolve, reject) => {
            this.http.get<Task[]>(this.apiUrl + 'tasks' + queryParams).subscribe(
                success => {
                    resolve(success);
                },
                error => {
                    reject(error);
                }
            )
        })
    }

    updateTask(task: Task): Promise<Task> {
        return new Promise ((resolve, reject) => {
            this.http.put<Task>(this.apiUrl + 'tasks/' + task.id, task).subscribe(
                success => {
                    resolve(success);
                },
                error => {
                    reject(error);
                }
            )
        })
    }

    deleteTask(task: Task): Promise<void> {
        return new Promise ((resolve, reject) => {
            this.http.delete<void>(this.apiUrl + 'tasks/' + task.id).subscribe(
                success => {
                    resolve(success);
                },
                error => {
                    reject(error);
                }
            )
        })
    }

    addTask(task: Task): Promise<Task> {
        return new Promise ((resolve, reject) => {
            this.http.post<Task>(this.apiUrl + 'tasks', task).subscribe(
                success => {
                    resolve(success);
                },
                error => {
                    reject(error);
                }
            )
        })
    }

}