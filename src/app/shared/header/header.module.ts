import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [ HeaderComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
