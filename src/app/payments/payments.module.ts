import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule, PaymentsRoutingModule, TranslateModule.forChild()]
})
export class PaymentsModule {}
