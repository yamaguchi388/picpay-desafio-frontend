import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
  ]
})
export class AccountModule { }
