import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { SharedModule } from '../../shared/shared.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppMaterialModule,
    TranslateModule,
    PaymentsRoutingModule,
  ],
})
export class PaymentsModule {}
