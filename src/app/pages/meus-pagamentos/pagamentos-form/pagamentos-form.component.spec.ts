import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentosFormComponent } from './pagamentos-form.component';

describe('PagamentosFormComponent', () => {
  let component: PagamentosFormComponent;
  let fixture: ComponentFixture<PagamentosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagamentosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
