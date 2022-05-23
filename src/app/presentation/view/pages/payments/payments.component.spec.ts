import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { IPaymentsController } from 'src/app/domain/interfaces/controllers/ipayments-controller';
import { SharedModule } from '../../shared/shared.module';
import { PaymentsComponent } from './payments.component';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  const controllerSpy = jasmine.createSpyObj('IPaymentsController', ['getPayments', 'createPayment', 'updatePayment', 'deletePayment']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ PaymentsComponent ],
      imports: [ SharedModule, TranslateModule.forRoot() ],
      providers: [
        { provide: IPaymentsController, useValue: controllerSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {  
    let mockPaymentsResponse: any[] = []; 
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    controllerSpy.getPayments.and.returnValue(of(mockPaymentsResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
