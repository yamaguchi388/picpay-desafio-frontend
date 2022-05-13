import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const declarations = [ConfirmationDialogComponent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogModule {}
