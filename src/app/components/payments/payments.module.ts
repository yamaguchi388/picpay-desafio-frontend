import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { HeaderModule } from "./../../shared/header/header.module";
import { PaymentsComponent } from "./payments.component";

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule,
    HeaderModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [PaymentsComponent],
})
export class PaymentsModule {}
