import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";

import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { CustomPaginator } from "../../lib";
import { MatSortModule } from "@angular/material/sort";

const sharedModules = [
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatButtonModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatCardModule,
  MatPaginatorModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSortModule,
];

@NgModule({
  imports: [...sharedModules],
  exports: [...sharedModules],
  declarations: [],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class MaterialModule {}
