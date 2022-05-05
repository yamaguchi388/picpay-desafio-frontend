import { HttpClient } from '@angular/common/http';
// import { HttpClient, Response, HttpHeaders, RequestOptions, URLSearchParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import 'rxjs/add/operator/map';

export const subject = new Subject<any>();
// export const currentPayment = new Subject<any>();
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
headers = {};
options = {};
currentPayment = {};
paymentList = []
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

public delete(id: number) {
    return this.http.delete(`${ this.apiURL }/tasks/${id}`)
        .subscribe((data) => this.getTaskApi());

}

public setCurrentPayment(item){
    this.currentPayment = item;
}

private extractData(res: Response) {
    let body = res.json();
    return body || {};
}

public updatePaymentItem(param) {
    let body: any = this.currentPayment;
        Object.keys(param)
            .forEach((data) => {
                body[data] = (body[data] !== param[data]) && !!param[data]? param[data] : body[data];
        });

    return this.http
        .patch(`${ this.apiURL }/tasks/${body.id}`, body)
        .subscribe((data) => data);
}


}