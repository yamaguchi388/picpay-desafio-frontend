import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { PaymentsService } from "src/app/services/payments/payments.service";

import { HeaderModule } from "src/app/components/organisms/header/header.module";
import { FiltersModule } from "src/app/components/molecules/filters/filters.module";
import { PaginatorModule } from "src/app/components/molecules/paginator/paginator.module";
import { TableModule } from "src/app/components/organisms/table/table.module";
import { DeleteDialogModule } from "src/app/components/organisms/delete-dialog/delete-dialog.module";
import { IncludeDialogModule } from "src/app/components/organisms/include-dialog/include-dialog.module";

import { DashboardComponent } from "./dashboard.component";
import { EditDialogModule } from "src/app/components/organisms/edit-dialog/edit-dialog.module";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HeaderModule,
    PaginatorModule,
    FiltersModule,
    TableModule,
    DeleteDialogModule,
    IncludeDialogModule,
    EditDialogModule,
    RouterModule.forChild(routes),
  ],
  providers: [PaymentsService],
  exports: [RouterModule],
})
export class DashboardModule {}
