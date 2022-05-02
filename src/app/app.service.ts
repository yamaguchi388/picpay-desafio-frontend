import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from './classes/Task';

@Injectable({
    providedIn: 'root'
})
 
export class AppService {

    private apiUrl = 'http://localhost:3000/'

    constructor(private http: HttpClient) { }

    getAccountByEmailAndPassword(email: string, password: string): Promise<any[]> {
        return new Promise ((resolve, reject) => {
            this.http.get<any>(this.apiUrl + 'account?email=' + email + '&password=' + password).subscribe(
                success => {
                    resolve(success);
                },
                error => {
                    reject(error);
                }
            )
        })
    }

    getTasks(queryParams?: string) {
        if (!queryParams) {
            queryParams = '';
        }

        return new Promise ((resolve, reject) => {
            this.http.get<Task>(this.apiUrl + 'tasks' + queryParams).subscribe(
                success => {
                    resolve(success);
                },
                error => {
                    reject(error);
                }
            )
        })
    }

    updateTask(task: Task) {
        return new Promise ((resolve, reject) => {
            this.http.put<any>(this.apiUrl + 'tasks/' + task.id, task).subscribe(
                success => {
                    resolve(success);
                },
                error => {
                    reject(error);
                }
            )
        })
    }

    deleteTask(task: Task) {
        return new Promise ((resolve, reject) => {
            this.http.delete<any>(this.apiUrl + 'tasks/' + task.id).subscribe(
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