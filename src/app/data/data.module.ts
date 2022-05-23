import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPaymentsRepository } from '../domain/interfaces/repositories/ipayments-repository';
import { PaymentsRepositoryService } from './repositories/payments/payments-repository.service';
import { HttpClientModule } from '@angular/common/http';
import { IUsersRepository } from '../domain/interfaces/repositories/iusers-repository';
import { UsersRepositoryService } from './repositories/users/users-repository.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: IPaymentsRepository, useClass: PaymentsRepositoryService },
    { provide: IUsersRepository, useClass: UsersRepositoryService },
  ],
})
export class DataModule {}
