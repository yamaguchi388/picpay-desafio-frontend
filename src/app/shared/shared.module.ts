import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { PicpayButtonModule } from './components/picpay-button/picpay-button.module';

const SHARED_MODULES = [
  MatTooltipModule,
  MatSelectModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  ReactiveFormsModule,
  MatRadioModule,
  MatExpansionModule,
  MatCardModule,
  PicpayButtonModule
];

@NgModule({
    imports: [...SHARED_MODULES],
    exports: [...SHARED_MODULES],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class SharedModule {}
