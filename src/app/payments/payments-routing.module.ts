import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaymentsComponent } from './payments.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: PaymentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule.forChild()],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {}
