import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPaymentsController } from '../domain/interfaces/controllers/ipayments-controller';
import { PaymentsControllerService } from './controllers/payments/payments-controller.service';
import { ViewModule } from './view/view.module';
import { IUsersController } from '../domain/interfaces/controllers/iusers-controller';
import { UsersControllerService } from './controllers/users/users-controller.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, ViewModule],
  exports: [ViewModule],
  providers: [
    { provide: IPaymentsController, useClass: PaymentsControllerService },
    { provide: IUsersController, useClass: UsersControllerService },
  ],
})
export class PresentationModule {}
