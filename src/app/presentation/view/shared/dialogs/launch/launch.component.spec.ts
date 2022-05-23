import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared.module';
import { AddPaymentComponent } from '../add-payment/add-payment.component';

import { LaunchComponent } from './launch.component';

describe('LaunchComponent', () => {
  let component: LaunchComponent;
  let fixture: ComponentFixture<LaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaunchComponent],
      imports: [SharedModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open add payment dialog with an existing payment', () => {
    let payment = {
      user: {
        name: 'John Doe',
        nick: 'John',
        title: 'titulozinho',
      },
      date: new Date(),
      value: 100,
    };

    component.component = AddPaymentComponent;
    component.config = {
      width: '772px',
      data: { payment },
    };
    component.openDialog();
    fixture.detectChanges();
    const dialogHeader = document.querySelector('h3');
    expect(dialogHeader?.textContent).toBe('TXT_EDITAR_PAGAMENTO');
  });
});
