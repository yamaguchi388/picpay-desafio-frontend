import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { BaseComponent } from './base.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class BaseModule { }
