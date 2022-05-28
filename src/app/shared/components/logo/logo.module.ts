import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [LogoComponent],
  exports: [LogoComponent]
})
export class LogoModule {}
