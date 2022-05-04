import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentsComponent } from "./payments.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderModule } from "../../shared/components/header/header.module";

const routes: Routes = [
  {
    path: "",
    component: PaymentsComponent,
  },
];

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), HeaderModule],
})
export class PaymentsModule {}
