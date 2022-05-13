import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPayment } from 'src/app/shared/interfaces/payment';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { QueryPayments } from 'src/app/shared/models/query-payments';
import { NewPaymentComponent } from '../new-payment/new-payment.component';
import { DeletePaymentComponent } from '../delete-payment/delete-payment.component';
import * as moment from 'moment';
import { EditPayedPaymentComponent } from '../edit-payed/edit-payed-payment.component';

@Component({
  selector: 'list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
})
export class ListPaymentsComponent implements OnInit {
  
  public form: FormGroup;
  pago: boolean = false;
  paymentLength: number = 100;
  paymentPageSize: number = 10;
  paymentPageSizeOptions: number[] = [5, 10, 25, 100];
  paymentPageEvent: number = 0;
  loading: boolean = false;


  payments: IPayment[];

  displayedColumns: string[] = [
    'username',
    'title',
    'date',
    'value',
    'isPayed',
    'actions',
  ];

  pageSizeOptions: number[] = [5, 10, 25, 50];

  isLoading = false;
  dataSource: MatTableDataSource<IPayment> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly dialog: MatDialog,
    private readonly paymentService: PaymentService,
    private readonly sweetAlertService: SweetAlertService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initGetAllPayments();
    this.filterPayments()
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', []),
      title: new FormControl('', []),
      startDate: new FormControl('', []),
      endDate: new FormControl('', []),
    })
  }

  cleanSearch() {
    this.form.reset()
  }

  initGetAllPayments() {
    this.paymentService.getAllPayments().subscribe((next) => {
      this.payments = next;
      this.paymentLength = this.payments.length;
      if (this.payments.length === 0) {
        this.sweetAlertService.show({
          icon: 'success',
          text: `Nenhum pagamento foi encontrado.`
        }); 
      }    
    },
    (error) => {
      console.log(error);
      this.sweetAlertService.show({
        icon: 'error',
        text: `Tente novamente mais tarde.`
      });           
    }
  )
  }

  filterPayments() {
    const startDate = this.form.controls.startDate.value || '';
    let endDate = this.form.controls.endDate.value ? moment(this.form.controls.endDate.value).add(1, 'day').toString() : '';
    const query = {
      name: this.form.controls.name.value || '',
      title: this.form.controls.title.value || '',
      startDate: startDate,
      endDate: endDate,
      page: this.paymentPageEvent,
      limit: this.paymentPageSize
    } as QueryPayments;

    this.paymentService.getFiltredPayments(query)
      .subscribe((next) => {
          this.payments = next;
          if (this.payments.length > 0) {
            if (startDate && endDate){
              this.payments = this.payments.filter((payment) =>
                new Date(payment.date) >= new Date(startDate)  && new Date(payment.date) <= new Date(endDate));
            } else if (startDate) {
              this.payments = this.payments.filter((payment) =>
                new Date(payment.date) >= new Date(startDate));
            } else if (endDate) {
              this.payments = this.payments.filter((payment) =>
                new Date(payment.date) <= new Date(endDate));
            }
          }
          if (this.payments.length === 0) {
            this.sweetAlertService.show({
              icon: 'success',
              text: `Nenhum pagamento foi encontrado.`
            }); 
          }    
          
          this.dataSource = new MatTableDataSource(this.payments);
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.log(error);
          this.sweetAlertService.show({
            icon: 'error',
            text: `Tente novamente mais tarde.`
          });           
        }
      )
  }

  addPayment() {
    const dialogPass = this.dialog.open(NewPaymentComponent, {
      width: '772px',
      height: '395px',
    });

    dialogPass.afterClosed().subscribe((payment) => {
      if (payment) {
        this.paymentService.savePayment(payment)
        .subscribe( _ => {      
            this.dataSource = new MatTableDataSource(this.payments);
            this.dataSource.sort = this.sort;
            this.sweetAlertService.show({
              icon: 'success',
              text: `Cadastro realizado com sucesso.`
            });       
          },
          (error) => {
            console.log(error);
            this.sweetAlertService.show({
              icon: 'error',
              text: `Tente novamente mais tarde.`
            });           
          }
        )
      }
    })
  }

  updatePayment(data?: IPayment, isPayedUpdate: boolean = false) {    
    if (isPayedUpdate) {
      data.isPayed = isPayedUpdate;
      this.paymentService.updatePayment(data)
        .subscribe( _ => {      
            this.dataSource = new MatTableDataSource(this.payments);
            this.dataSource.sort = this.sort;
            this.payments = this.payments.map((paymentAlerado) => {
              if (paymentAlerado.id !== data.id) { return paymentAlerado; }
              return data;
            });
            this.sweetAlertService.show({
              icon: 'success',
              text: `Pagamento alterado com sucesso.`
            });       
          },
          (error) => {
            console.log(error);
            this.sweetAlertService.show({
              icon: 'error',
              text: `Tente novamente mais tarde.`
            });           
          }
        )
    } else {
      const dialogPass = this.dialog.open(NewPaymentComponent, {
        width: '772px',
        height: '395px',
        data,
      });
  
      dialogPass.afterClosed().subscribe((payment) => {
        if (payment) {
          this.paymentService.updatePayment(payment)
          .subscribe( _ => {      
              this.dataSource = new MatTableDataSource(this.payments);
              this.dataSource.sort = this.sort;
              this.payments = this.payments.map((paymentAlerado) => {
                if (paymentAlerado.id !== payment.id) { return paymentAlerado; }
                return payment;
              });
              this.sweetAlertService.show({
                icon: 'success',
                text: `Pagamento editado com sucesso.`
              });       
            },
            (error) => {
              console.log(error);
              this.sweetAlertService.show({
                icon: 'error',
                text: `Tente novamente mais tarde.`
              });           
            }
          )
        }
      })
    }
  }

  deletePayment(data: IPayment) {
    const dialogPass = this.dialog.open(DeletePaymentComponent, {
      width: '405px',
      height: '325pxpx',
      data,
    });

    dialogPass.afterClosed().subscribe((payment) => {
      if (payment) {
        this.paymentService.detelePayment(data)
        .subscribe( _ => {
          this.sweetAlertService.show({
            icon: 'success',
            text: `Pagamento excluido com sucesso.`
          });
          this.filterPayments();   
          },
          (error) => {
            console.log(error);
            this.sweetAlertService.show({
              icon: 'error',
              text: `Tente novamente mais tarde.`
            });           
          })
      }
    });
  }

  changePaymentPage($event) {
     this.loading = true;
    this.paymentPageEvent = $event?.pageIndex + 1;
    this.paymentPageSize = $event?.pageSize;
    this.filterPayments();
  }

  orderBy(key: string) {
    this.dataSource.sort.sort({ id: key } as MatSortable);
  }
}