import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { PoModalComponent, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { IPagamento, IPagamentoAlterar, IPagamentoIncluir } from 'src/app/core/entities/entities.index';
import { IPaginacao } from 'src/app/core/entities/paginacao/paginacao.interface';
import { PagamentoAlterarService } from 'src/app/services/pagamentos/pagamento-alterar.service';
import { PagamentosDeleteByUdService } from 'src/app/services/pagamentos/pagamentos-delete-by-id.service';
import { PagamentosGetAllService } from 'src/app/services/pagamentos/pagamentos-get-all.service';
import { PagamentosGetByFilterService } from 'src/app/services/pagamentos/pagamentos-get-by-filter.service';
import { PagamentosGetByNameService } from 'src/app/services/pagamentos/pagamentos-get-by-name.service';
import { PagamentosIncluirService } from 'src/app/services/pagamentos/pagamentos-incluir.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('modalIncluirPagamento', { static: true }) modalIncluirPagamento: PoModalComponent;
  @ViewChild('modalExcluirPagamento', { static: true }) modalExcluirPagamento: PoModalComponent;
  @ViewChild('modalAlterarPagamento', { static: true }) modalAlterarPagamento: PoModalComponent;
  @ViewChild('modalPesquisarPagamento', { static: true }) modalPesquisarPagamento: PoModalComponent;

  items: Array<IPagamento> = [];
  loading = false;
  isFiltrado = false;
  numeroPagina = 10;

  id: number;
  nome: string;
  usuario: string;
  data = new Date();
  valor: number;
  titulo: string;
  isPayed: boolean;
  buscarNome: string;
  buscarUsuario: string;
  buscarData: Date;
  buscarValor: number;
  buscarTitulo: string;
  buscarIsPayed: boolean;
  totalPaginas: number;
  pagamento: IPagamento;
  tableChange: IPaginacao;

  form = new FormGroup({
    usuario: new FormControl(null),
    nome: new FormControl(null),
    valor: new FormControl(null),
    data: new FormControl(null),
    titulo: new FormControl(null),
    isPayed: new FormControl(null),
  });

  formBuscar = new FormGroup({
    buscarUsuario: new FormControl(null),
    buscarNome: new FormControl(null),
    buscarValor: new FormControl(null),
    buscarData: new FormControl(null),
    buscarTitulo: new FormControl(null),
    buscarIsPayed: new FormControl(null),
  });

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'name',
      label: 'Usuário'
    },
    { 
      property: 'title',
      label: 'Título',
    },
    { 
      property: 'date',
      label: 'Data',
      type: 'dateTime',
      format: 'd MMM y HH:mm a'
    },
    { 
      property: 'value',
      label: 'Valor',
      type: 'currency',
      format: 'R$ '
    },
    { 
      property: 'isPayed',
      label: 'Pago',
      type: 'columnTemplate'
    },
    {
      property: 'opcoes',
      label: 'Opções',
      type: 'icon',
      sortable: false,
      icons: [
        {
          action: this.openModaleditar.bind(this),
          icon: 'po-icon-edit',
          tooltip: 'Editar pagamento',
          value: 'editar'
        },
        {
          action: this.openModalExcluir.bind(this),
          icon: 'po-icon-clear-content',
          tooltip: 'Excluir pagamento',
          value: 'excluir'
        }
      ]
    },
  ];

  constructor(
    private readonly pagamentosGetAllService: PagamentosGetAllService,
    private readonly pagamentosGetByNameService: PagamentosGetByNameService,
    private readonly pagamentosIncluirService: PagamentosIncluirService,
    private readonly pagamentosDeleteByUdService: PagamentosDeleteByUdService,
    private readonly pagamentoAlterarService: PagamentoAlterarService,
    private readonly pagamentosGetByFilterService: PagamentosGetByFilterService,
    private readonly poNotification: PoNotificationService) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel="Exibir";
    this.paginator._intl.nextPageLabel = "Próxima pagina";
    this.paginator._intl.previousPageLabel = "Página anterior"; 

    this.carregarPagamentos();
    this.getTotalRegistros();

  }

  alterarTabela(alteracao: IPaginacao): void {
    this.tableChange = alteracao;
    this.loading = true;
    this.items = [];
    this.pagamentosGetAllService.next(this.tableChange.pageIndex + 1, this.tableChange.pageSize).subscribe((pagamentos: IPagamento[]) => {
        pagamentos.forEach((pagamento: IPagamento) => {
          pagamento.opcoes = ['editar', 'excluir'];
          this.items.push(pagamento);
        });
        this.loading = false;
    }, (erro) => {
      this.poNotification.error({message: erro.message});
    });
  }

  buscarPorUsuario(name: string): void {
    if(name.length){
      this.loading = true;
      this.pagamentosGetByNameService.getByName(name).subscribe((pagamentos: IPagamento[]) => {
        this.items = [];
        pagamentos.forEach((pagamento: IPagamento) => {
          pagamento.opcoes = ['editar', 'excluir'];
          this.items.push(pagamento);
        });
        this.loading = false;
      }, (erro) => {
        this.poNotification.error({message: erro.message});
      });
    }else{
      this.carregarPagamentos();
    }
    
  }

  fecharModalIncluir(): void {
    this.modalIncluirPagamento.close();
    this.limparFormulario();
  }

  fecharModalExcluir(): void {
    this.modalExcluirPagamento.close();
    this.limparFormulario();
  }

  fecharModalAlterar(): void {
    this.modalAlterarPagamento.close();
    this.limparFormulario();
  }

  fecharModalBusca(): void {
    this.modalPesquisarPagamento.close();
    this.limparFormulario();
  }

  buscaIsPayed(isPayed: boolean) {
    this.buscarIsPayed = isPayed;
  }

  carregarPagamentos(): void {
    this.isFiltrado = false;
    this.loading = true;
    this.items = [];
    this.pagamentosGetAllService.getAll().subscribe((pagamentos: IPagamento[]) => {
        pagamentos.forEach((pagamento: IPagamento) => {
          pagamento.opcoes = ['editar', 'excluir'];
          this.items.push(pagamento);
        });
        this.loading = false;
    }, (erro) => {
      this.poNotification.error({message: erro.message});
    });
  }

  buscarPagamento(): void {
    if(this.formBuscar.valid){

      this.loading = true;
      const date = this.buscarData ? this.buscarData.toString() : '';

      this.pagamentosGetByFilterService.getByFilters(
        this.buscarNome,
        this.buscarUsuario,
        this.buscarValor,
        this.buscarTitulo,
        date,
        this.buscarIsPayed).subscribe((pagamentos: IPagamento[]) => {

          if(pagamentos.length){
            this.isFiltrado = true;
            this.items = [];
            pagamentos.forEach((pagamento: IPagamento) => {
              pagamento.opcoes = ['editar', 'excluir'];
              this.items.push(pagamento);
            });
          } else{
            this.carregarPagamentos();
            this.poNotification.error({message: 'Nenhuma informação encontrada'});
          }

          this.limparFormulario();
          this.modalPesquisarPagamento.close();
          this.loading = false;
      }, (erro) => {
        this.isFiltrado = false
        this.poNotification.error({message: erro.message});
      });

    }
  }

  salvarPagamento(): void {
    if(this.form.valid){

      const pagamento: IPagamentoIncluir = {
        name: this.nome,
        username: this.usuario,
        value: this.valor,
        title: this.titulo,
        date: new Date(this.data).toISOString(),
        isPayed: this.isPayed
      };

      this.pagamentosIncluirService.incluir(pagamento).subscribe(() => {
        this.modalIncluirPagamento.close();
        this.limparFormulario();
        this.poNotification.success({message: 'Pagamento incluído com sucesso'});
      }, (erro) => {
        this.poNotification.error({message: erro.message});
      });

    }else{
      this.poNotification.error({message: 'Necessário preencher todos campos para incluir o pagamento'});
    }
    
  }

  excluirPagamento(): void {
    this.pagamentosDeleteByUdService.excluir(this.pagamento.id).subscribe(() => {
      this.modalExcluirPagamento.close();
      this.getTotalRegistros();
      this.poNotification.success({message: 'Pagamento excluído com sucesso'});
      this.alterarTabela(this.tableChange);
    }, (erro) => {
      this.poNotification.error({message: erro.message});
    });
  }

  alterarPagamento(): void {
    if(this.form.valid){

      const pagamento: IPagamentoAlterar = {
        id: this.id,
        name: this.nome,
        username: this.usuario,
        value: this.valor,
        title: this.titulo,
        date: new Date(this.data).toISOString(),
        isPayed: this.isPayed
      };

      this.pagamentoAlterarService.alterar(pagamento).subscribe(() => {
        this.modalAlterarPagamento.close();
        this.limparFormulario();
        this.poNotification.success({message: 'Pagamento alterado com sucesso'});
        this.alterarTabela(this.tableChange);
      }, (erro) => {
        this.poNotification.error({message: erro.message});
      });
    }
  }

  openModaleditar(pagamento: IPagamento): void{
    this.limparFormulario();
    this.pagamento = pagamento;
    this.setValoresFormulario(pagamento);
    this.modalAlterarPagamento.open();
  }

  openModalExcluir(pagamento: IPagamento): void {
    this.pagamento = pagamento;
    this.setValoresFormulario(pagamento);
    this.modalExcluirPagamento.open();
  }

  private setValoresFormulario(pagamento: IPagamento): void {
    this.id = pagamento.id;
    this.nome = pagamento.name;
    this.usuario = pagamento.username;
    this.isPayed = pagamento.isPayed;
    this.valor = pagamento.value;
    this.titulo = pagamento.title;
    this.data = new Date(pagamento.date);
  }

  private limparFormulario(): void {
    this.nome = '';
    this.usuario = '';
    this.isPayed = false;
    this.valor = undefined;
    this.titulo = '';
    this.data = new Date();

    this.buscarNome = undefined;
    this.buscarUsuario = undefined;
    this.buscarData = undefined;
    this.buscarValor = undefined;
    this.buscarTitulo = undefined;
    this.buscarIsPayed = undefined;
  }

  private getTotalRegistros(): void {
    this.pagamentosGetAllService.getTotal().subscribe((response) => {
      this.totalPaginas = Number(response.headers.get('X-Total-Count'));
      this.tableChange = {
        length: this.totalPaginas,
        pageIndex: 0,
        pageSize: 10,
        previousPageIndex: 1
      };
    }, (erro) => {
      this.poNotification.error({message: erro.message});
    });
  }

}
