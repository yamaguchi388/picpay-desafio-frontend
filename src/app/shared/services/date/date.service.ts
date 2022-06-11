import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public formatDate(date: string): string {
    const options: any = {
      dateStyle: "short"
    }
    const locale = 'pt-br'; 
     return new Date(date).toLocaleDateString(locale, options);
  }

  public formatTime(date: string): string {
    const aux = new Date(date);
    const newDate = aux.getFullYear() + '-' +
        (aux.getMonth() + 1).toString().padStart(2, '0') + '-' +
        aux.getDate().toString().padStart(2, '0');
    const newTime = aux.getHours().toString().padStart(2, '0') + ':' + aux.getMinutes().toString().padStart(2, '0');
    return newDate + 'T' + newTime;
  }
}
