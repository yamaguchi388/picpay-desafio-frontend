import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PoFieldModule, PoTableModule, PoButtonModule, PoContainerModule, PoModalModule } from "@po-ui/ng-components";
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { PagamentosGetAllService } from "src/app/services/pagamentos/pagamentos-get-all.service";
import { PagamentosGetByNameService } from "src/app/services/pagamentos/pagamentos-get-by-name.service";
import { TableComponent } from "./table.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { PagamentosIncluirService } from "src/app/services/pagamentos/pagamentos-incluir.service";
import { PagamentosDeleteByUdService } from "src/app/services/pagamentos/pagamentos-delete-by-id.service";
import { PagamentoAlterarService } from "src/app/services/pagamentos/pagamento-alterar.service";
import { PagamentosGetByFilterService } from "src/app/services/pagamentos/pagamentos-get-by-filter.service";

@NgModule({
    declarations: [TableComponent],
    imports: [
        CommonModule,
        PoTableModule,
        PoFieldModule,
        PoButtonModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        PoContainerModule,
        PoPageDynamicSearchModule,
        PoModalModule
    ],
    exports: [TableComponent],
    providers: [
        PagamentosGetAllService,
        PagamentosGetByNameService,
        PagamentosIncluirService,
        PagamentosDeleteByUdService,
        PagamentoAlterarService,
        PagamentosGetByFilterService
    ]
  })
  export class TableModule { }