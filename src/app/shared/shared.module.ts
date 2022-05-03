import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UnavailableComponent } from './components/unavailable/unavailable/unavailable.component';



@NgModule({
  declarations: [
    UnavailableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [

  ]
})
export class SharedModule { }
