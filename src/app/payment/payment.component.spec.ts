import { MatMenuModule } from '@angular/material/menu';
import { inject } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { PaymentService } from './../service/payment.service';
import { PaymentComponent } from './payment.component';

fdescribe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule,
        MatMenuModule
      ],
      providers: [PaymentService],
      declarations: [PaymentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as limit 5', () => {
    inject([PaymentComponent], (app: PaymentComponent) => {
      expect(app.limit).toEqual(5);
    });
  });

  it('should have as currentPage 1', () => {
    inject([PaymentComponent], (app: PaymentComponent) => {
      expect(app.currentPage).toEqual(1);
    });
  });

  it('should have as limitSelected 5', () => {
    inject([PaymentComponent], (app: PaymentComponent) => {
      expect(app.limitSelected).toEqual(5);
    });
  });

  it('should have changed limit', () => {
    inject([PaymentComponent], (app: PaymentComponent) => {
      app.limit = 10;
      fixture.detectChanges();
      const elementLimit: DebugElement = fixture.debugElement.query(By.css('#limit'))
      expect((elementLimit.nativeElement as HTMLSpanElement).textContent).toEqual('10');
    });
  });
});
