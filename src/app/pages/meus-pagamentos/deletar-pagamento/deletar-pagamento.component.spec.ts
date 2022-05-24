import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarPagamentoComponent } from './deletar-pagamento.component';

describe('DeletarPagamentoComponent', () => {
  let component: DeletarPagamentoComponent;
  let fixture: ComponentFixture<DeletarPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
