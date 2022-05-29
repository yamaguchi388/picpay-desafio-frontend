/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FilterPaymentsDialogComponent } from './filter-payments-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('FilterPaymentsDialogComponent', () => {
  let component: FilterPaymentsDialogComponent;
  let fixture: ComponentFixture<FilterPaymentsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPaymentsDialogComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), MatCheckboxModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPaymentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
