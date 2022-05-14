import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import { HeaderModule } from "./../../shared/header/header.module";
import { PaymentsComponent } from "./payments.component";

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule, HeaderModule, MatButtonModule],
  exports: [PaymentsComponent],
})
export class PaymentsModule {}
