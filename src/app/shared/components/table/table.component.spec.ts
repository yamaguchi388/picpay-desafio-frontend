import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { of, throwError } from 'rxjs';
import { IPagamento } from 'src/app/core/entities/entities.index';
import { IPaginacao } from 'src/app/core/entities/paginacao/paginacao.interface';
import { PagamentoAlterarService } from 'src/app/services/pagamentos/pagamento-alterar.service';
import { PagamentosDeleteByUdService } from 'src/app/services/pagamentos/pagamentos-delete-by-id.service';
import { PagamentosGetAllService } from 'src/app/services/pagamentos/pagamentos-get-all.service';
import { PagamentosGetByFilterService } from 'src/app/services/pagamentos/pagamentos-get-by-filter.service';
import { PagamentosGetByNameService } from 'src/app/services/pagamentos/pagamentos-get-by-name.service';
import { PagamentosIncluirService } from 'src/app/services/pagamentos/pagamentos-incluir.service';

import { TableComponent } from './table.component';

const pagamento: IPagamento[] = [{
  id: 170,
  name:  "Morganica O'Sheils",
  username: "mosheils4p",
  title: "Analyst Programmer",
  value: 207.4,
  date: "2021-05-05T10:22:13Z",
  image: "https://robohash.org/illumexpeditadeleniti.png?size=150x150&set=set1",
  isPayed: true
}];

const response: HttpResponse<Response> = {
  body: null,
  clone: null,
  headers: new HttpHeaders,
  ok: true,
  status: 0,
  statusText: '',
  type: null,
  url: ''
}

const paginacao: IPaginacao = {
  length: 100,
  pageIndex: 0,
  pageSize: 10,
  previousPageIndex: 1
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const PagamentosGetAllServiceSpy = jasmine.createSpyObj<PagamentosGetAllService>(['getAll', 'getTotal', 'next']); 
  PagamentosGetAllServiceSpy.getAll.and.returnValue(of(pagamento));
  PagamentosGetAllServiceSpy.getTotal.and.returnValue(of(response));

  const PagamentosGetByNameServiceSpy = jasmine.createSpyObj<PagamentosGetByNameService>(['getByName']); 
  const PagamentosIncluirServiceSpy = jasmine.createSpyObj<PagamentosIncluirService>(['incluir']); 
  const PagamentosDeleteByidServiceSpy = jasmine.createSpyObj<PagamentosDeleteByUdService>(['excluir']); 
  const PagamentoAlterarServiceSpy = jasmine.createSpyObj<PagamentoAlterarService>(['alterar']); 
  const PagamentosGetByFilterServiceSpy = jasmine.createSpyObj<PagamentosGetByFilterService>(['getByFilters']); 
  const PoNotificationServiceSpy = jasmine.createSpyObj<PoNotificationService>(['error', 'success']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, MatPaginatorModule ],
      declarations: [ TableComponent, PoModalComponent ],
      providers: [
        {
          provide: PagamentosGetAllService,
          useValue: PagamentosGetAllServiceSpy
        },
        {
          provide: PagamentosGetByNameService,
          useValue: PagamentosGetByNameServiceSpy
        },
        {
          provide: PagamentosIncluirService,
          useValue: PagamentosIncluirServiceSpy
        },
        {
          provide: PagamentosDeleteByUdService,
          useValue: PagamentosDeleteByidServiceSpy
        },
        {
          provide: PagamentoAlterarService,
          useValue: PagamentoAlterarServiceSpy
        },
        {
          provide: PagamentosGetByFilterService,
          useValue: PagamentosGetByFilterServiceSpy
        },
        {
          provide: PoNotificationService,
          useValue: PoNotificationServiceSpy
        }, 
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.pagamento = pagamento[0];
    fixture.detectChanges();
  });

  it('Dever criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Dever apresentar erro ao buscar Total de registros', () => {
    PagamentosGetAllServiceSpy.getTotal.and.returnValue(throwError(new Error));
    component.ngOnInit();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever alterar a paginacao da tabela', () => {
    PagamentosGetAllServiceSpy.next.and.returnValue(of(pagamento));
    component.alterarTabela(paginacao);
    expect(PagamentosGetAllServiceSpy.next).toHaveBeenCalled();
    expect(component.items).not.toBeNull();
  });

  it('Dever apresentar erro ao tentar alterar paginacao da tabela', () => {
    PagamentosGetAllServiceSpy.next.and.returnValue(throwError(new Error));
    component.alterarTabela(paginacao);
    expect(PagamentosGetAllServiceSpy.next).toHaveBeenCalled();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever fazer a busca por usuário', () => {
    PagamentosGetByNameServiceSpy.getByName.and.returnValue(of(pagamento));
    component.buscarPorUsuario('usuario');
    expect(PagamentosGetByNameServiceSpy.getByName).toHaveBeenCalled();
    expect(component.items).not.toBeNull();
  });

  it('Dever apresentar erro ao tentar fazer a busca por usuário', () => {
    PagamentosGetByNameServiceSpy.getByName.and.returnValue(throwError(new Error));
    component.buscarPorUsuario('usuario');
    expect(PagamentosGetByNameServiceSpy.getByName).toHaveBeenCalled();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever carregar todos os pagamentos caso não encontre o filtro', () => {
    component.buscarPorUsuario('');
    expect(PagamentosGetAllServiceSpy.getAll).toHaveBeenCalled();
  });

  it('Dever fechar o modal incluir e limpar o fomulário', () => {
    const modalIncluirSpy = spyOn(component.modalIncluirPagamento, 'close');
    component.fecharModalIncluir();
    expect(component.nome).toBe('');
    expect(modalIncluirSpy).toHaveBeenCalled();
  });

  it('Dever fechar o modal excluir e limpar o fomulário', () => {
    const modalEncluirSpy = spyOn(component.modalExcluirPagamento, 'close');
    component.fecharModalExcluir();
    expect(component.nome).toBe('');
    expect(modalEncluirSpy).toHaveBeenCalled();
  });

  it('Dever fechar o modal alterar e limpar o fomulário', () => {
    const modalAlterarSpy = spyOn(component.modalAlterarPagamento, 'close');
    component.fecharModalAlterar();
    expect(component.nome).toBe('');
    expect(modalAlterarSpy).toHaveBeenCalled();
  });

  it('Dever fechar o modal busca e limpar o fomulário', () => {
    const modalPesquisaSpy = spyOn(component.modalPesquisarPagamento, 'close');
    component.fecharModalBusca();
    expect(component.nome).toBe('');
    expect(modalPesquisaSpy).toHaveBeenCalled();
  });

  it('Dever setar se o pagamento foi efeturado', () => {
    component.buscaIsPayed(true);
    expect(component.buscarIsPayed).toBeTrue();
  });
  
  it('Dever dar erro ao buscar os pagamentos', () => {
    PagamentosGetAllServiceSpy.getAll.and.returnValue(throwError(new Error));
    
    component.carregarPagamentos();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever buscar o pagamento pela busca avançada', () => {
    PagamentosGetByFilterServiceSpy.getByFilters.and.returnValue(of(pagamento));
    
    component.buscarPagamento();
    expect(PagamentosGetByFilterServiceSpy.getByFilters).toHaveBeenCalled();
    expect(component.items).not.toBeNull();
  });

  it('Dever apresentar erro ao tentar buscar o pagamento e carregar todos', () => {
    PagamentosGetByFilterServiceSpy.getByFilters.and.returnValue(throwError(new Error));
    
    component.buscarPagamento();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
    expect(PagamentosGetAllServiceSpy.getAll).toHaveBeenCalled();
  });

  it('Dever carregar todos todos as informações caso não encontrar nada na pesquisa', () => {
    PagamentosGetByFilterServiceSpy.getByFilters.and.returnValue(of([]));
    
    component.buscarPagamento();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
    expect(PagamentosGetAllServiceSpy.getAll).toHaveBeenCalled();
  });

  it('Dever salvar o novo pagamento', () => {
    PagamentosIncluirServiceSpy.incluir.and.returnValue(of(pagamento));
    
    component.salvarPagamento();
    expect(PagamentosIncluirServiceSpy.incluir).toHaveBeenCalled();
    expect(PoNotificationServiceSpy.success).toHaveBeenCalled();
  });

  it('Dever apresentar erro ao tentar salvar o novo pagamento', () => {
    PagamentosIncluirServiceSpy.incluir.and.returnValue(throwError(new Error));
    
    component.salvarPagamento();
    expect(PagamentosIncluirServiceSpy.incluir).toHaveBeenCalled();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever apresentar erro se os campos do formulários não estiverem preenchidos', () => {
    component.form.controls['usuario'].setErrors({'incorrect': true});
    component.salvarPagamento();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever excluir o novo pagamento', () => {
    PagamentosDeleteByidServiceSpy.excluir.and.returnValue(of(pagamento));
    component.tableChange = paginacao;

    component.excluirPagamento();
    expect(PagamentosDeleteByidServiceSpy.excluir).toHaveBeenCalled();
    expect(PoNotificationServiceSpy.success).toHaveBeenCalled();
  });

  it('Dever apresentar erro ao tentar excluir o novo pagamento', () => {
    PagamentosDeleteByidServiceSpy.excluir.and.returnValue(throwError(new Error));
    component.excluirPagamento();
    expect(PagamentosDeleteByidServiceSpy.excluir).toHaveBeenCalled();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever alterar o pagamento', () => {
    PagamentoAlterarServiceSpy.alterar.and.returnValue(of(pagamento));
    component.tableChange = paginacao;

    component.alterarPagamento();
    expect(PagamentoAlterarServiceSpy.alterar).toHaveBeenCalled();
    expect(PoNotificationServiceSpy.success).toHaveBeenCalled();
  });

  it('Dever apresentar erro ao tentar alterar o novo pagamento', () => {
    PagamentoAlterarServiceSpy.alterar.and.returnValue(throwError(new Error));
    component.alterarPagamento();
    expect(PagamentoAlterarServiceSpy.alterar).toHaveBeenCalled();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever abrir o modal de editar pagamento', () => {
    const modalAlterarSpy = spyOn(component.modalAlterarPagamento, 'open');

    component.openModaleditar(pagamento[0]);
    expect(component.id).toBe(170)
    expect(modalAlterarSpy).toHaveBeenCalled();
  });

  it('Dever abrir o modal de excluir pagamento', () => {
    const modalExcluirSpy = spyOn(component.modalExcluirPagamento, 'open');

    component.openModalExcluir(pagamento[0]);
    expect(component.id).toBe(170)
    expect(modalExcluirSpy).toHaveBeenCalled();
  });

});
