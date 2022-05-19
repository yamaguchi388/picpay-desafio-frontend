import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { DeletePaymentsComponent } from './delete-payments.component';


describe('DeletePaymentsComponent', () => {
  let component: DeletePaymentsComponent;
  let fixture: ComponentFixture<DeletePaymentsComponent>;
  // let httpClient: HttpClient;
  // let httpTestingController: HttpTestingController;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;
  let paymentService: jasmine.SpyObj<PaymentService>;
  let matDialog: jasmine.SpyObj<MatDialog>;

  const matDialogDataDummy: Task = {
    id: 1,
    name: '',
    username: '',
    title: '',
    value: 0,
    date: '',
    image: '',
    isPayed: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePaymentsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
      providers: [
        {
          provide: MatSnackBar,
          useValue: jasmine.createSpyObj('MatSnackBar', ['open']),
        },
        { provide: MAT_DIALOG_DATA, useValue: {matDialogDataDummy} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: paymentService,
          useValue: jasmine.createSpyObj(['deletePayment']),
        }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DeletePaymentsComponent);
    component = fixture.componentInstance;
    matSnackBar = TestBed.get(MatSnackBar);
    matDialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete payment', () => {
    spyOn(component, 'deletePayment').and.callThrough();
    component.deletePayment(1);
    expect(component.deletePayment).toHaveBeenCalled();
  });

});
