import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './loading/loading.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatCoinPipe } from './pipes/format-coin.pipe';

@NgModule({
  declarations: [
    LoadingComponent, 
    FormatDatePipe, 
    FormatCoinPipe
  ],
  imports: [
    MatProgressSpinnerModule
  ],
  exports: [
    LoadingComponent, 
    FormatDatePipe, 
    FormatCoinPipe
  ]
})
export class SharedModule { }
