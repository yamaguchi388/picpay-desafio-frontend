import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDatePipe'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, format: string = 'DD/MM/YYYY'): unknown {
    const date = new Date(value);
    return moment(value).format(format);
  }

}
