import { PaymentData } from 'src/models/PaymentData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const currentPaymentPage = new Subject<any>();
export const totalTaskItems = new Subject<number>();

@Injectable({
  providedIn: 'root'
})
export class TasksService {
apiURL = 'http://localhost:3000';
currentPage = 1;
limitItems = 5;
taskList: Array<object> = [];
currentPayment = {};
paymentListLength: number = 0;
  constructor(private http : HttpClient) { 

  }


  getTaskApi(){
    this.http.get(`${ this.apiURL }/tasks?_page=${this.currentPage}&_limit=${!!this.limitItems ? this.limitItems : ''}`)
    .subscribe((taskListApi: Array<PaymentData>) => {
        currentPaymentPage.next(taskListApi);
  })
}

    getTotalTaskItems(){
        return this.http.get(`${ this.apiURL }/tasks`)
        .subscribe((taskListApi: Array<PaymentData>) => {
            totalTaskItems.next(Object.keys(taskListApi).length);
        })
    }

    setCurrentPage(page: number){
        this.currentPage = page;
        this.http.get(`${ this.apiURL }/tasks?_page=${page}&_limit=${!!this.limitItems ? this.limitItems : ''}`)
        .subscribe((taskListApi: Array<PaymentData>) => {
            currentPaymentPage.next(taskListApi);
        })
    }


    setLimitItems(totalItems: number){
        this.limitItems = totalItems; 

        this.http.get(`${ this.apiURL }/tasks?_page=${this.currentPage}&_limit=${!!totalItems ? totalItems : ''}`)
        .subscribe((taskListApi: Array<PaymentData>) => {
            currentPaymentPage.next(taskListApi);
        })
    }

    public delete(id: number) {
        return this.http.delete(`${ this.apiURL }/tasks/${id}`)
            .subscribe((data) => this.getTaskApi());
    }

    public setCurrentPayment(item: PaymentData){
        this.currentPayment = item;
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

    public addPaymentItem(param){
        let body: any = param;
        body.id = this.paymentListLength + 1;
        return this.http
            .post(`${ this.apiURL }/tasks`, body)
            .subscribe((data) => this.getTotalTaskItems());
    }

    filterPayments(params){
        this.http.get(`${ this.apiURL }/tasks${this.getParamsFilter(params)}&_page=${this.currentPage}&_limit=${!!this.limitItems ? this.limitItems : ''}`)
        .subscribe((taskListApi) => {
            currentPaymentPage.next(taskListApi);
      })
    }

    getParamsFilter(params){
        const initialValue = '';
        const paramsFiltered = params.reduce((previousValue, currentValue) =>{ 
            const currentValueFormated = `?${currentValue.param}=${currentValue.value}`;
            const previousValueFormated = `&${previousValue.param}=${previousValue.value}`;
            return `${currentValueFormated}${!!previousValue ? previousValueFormated : ''}`;
        }, initialValue)

        return paramsFiltered;
    }

}