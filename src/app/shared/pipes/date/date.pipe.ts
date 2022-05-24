import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateForm'
})
export class DatePipe implements PipeTransform {

  transform(value: string, arg: string = 'date'): string {
    const date: Date = new Date(value);
    const months = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let dateFormat: string = '';

    if(arg === 'date') {
      dateFormat = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }
    else if(arg === 'hour') {
      dateFormat = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    return dateFormat;
  }
}
