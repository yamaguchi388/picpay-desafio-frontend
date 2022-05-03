import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export const subject = new Subject<any>();

export const totalTaskItems = new Subject<number>();

@Injectable({
  providedIn: 'root'
})
export class TasksService {
apiURL = 'http://localhost:3000';
currentPage = 1;
limitItems = 5;
validUser = {}; 
taskList: Array<object> = [];

  constructor(private http : HttpClient) { 

  }


  getTaskApi(){
    this.http.get(`${ this.apiURL }/tasks?_page=${this.currentPage}&_limit=${!!this.limitItems ? this.limitItems : ''}`)
    .subscribe((taskListApi) => {
        subject.next(taskListApi);
  })
}


getTotalTaskItems(){
    return this.http.get(`${ this.apiURL }/tasks`)
    .subscribe((taskListApi) => {
        totalTaskItems.next(Object.keys(taskListApi).length);
  })
}


setCurrentPage(page: number){
    this.currentPage = page;
    this.http.get(`${ this.apiURL }/tasks?_page=${page}&_limit=${!!this.limitItems ? this.limitItems : ''}`)
    .subscribe((taskListApi) => {
        subject.next(taskListApi);
  })
}


setLimitItems(totalItems: number){
    this.limitItems = totalItems; 

    this.http.get(`${ this.apiURL }/tasks?_page=${this.currentPage}&_limit=${!!totalItems ? totalItems : ''}`)
    .subscribe((taskListApi) => {
        subject.next(taskListApi);
  })
}

}