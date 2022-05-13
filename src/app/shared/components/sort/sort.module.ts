import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortComponent } from './sort.component';

@NgModule({
  declarations: [SortComponent],
  exports: [SortComponent],
  imports: [CommonModule],
})
export class SortModule {}