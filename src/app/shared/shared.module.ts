import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PpModalModule } from './components/modal/pp-modal.module';
import { PpButtonModule } from './components/button/pp-button.module';
import { PpErrorMessageModule } from './components/error-message/pp-error-message.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PpButtonModule,
    PpModalModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    PpButtonModule,
    PpModalModule,
    PpErrorMessageModule
  ],
})
export class SharedModule {}