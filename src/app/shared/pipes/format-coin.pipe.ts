import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCoin'
})
export class FormatCoinPipe implements PipeTransform {

  transform(value: number, coin: string = 'BRL'): unknown {
    return Intl.NumberFormat('pt-br', {style: 'currency', currency: coin}).format(value);
  }

}
