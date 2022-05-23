import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared.module';

import { PaymentsTableComponent } from './payments-table.component';

describe('TableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedModule, TranslateModule.forRoot() ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message when payments is empty', () => {
    component.payments = [];
    const emptyRow = fixture.nativeElement.querySelector('.empty-row')!;
    expect(emptyRow.textContent).toContain('Sem pagamentos...');
  });
});
