import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FilterTabComponent } from './components/filter-tab/filter-tab.component';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FilterInputComponent } from './components/filter-input/filter-input.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DateInfoComponent } from './components/date-info/date-info.component';
import { AddPaymentComponent } from './dialogs/add-payment/add-payment.component';
import { DeletePaymentComponent } from './dialogs/delete-payment/delete-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxMatNativeDateModule, NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { NotificationComponent } from './notification/notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { FilterDialogComponent } from './dialogs/filter-dialog/filter-dialog.component';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    declarations: [
        AvatarComponent,
        DateInfoComponent,
        FilterInputComponent,
        FilterTabComponent,
        HeaderComponent,
        LogoComponent,
        NavBarComponent,
        PaymentsTableComponent,
        PaginatorComponent,
        UserInfoComponent,
        AddPaymentComponent,
        DeletePaymentComponent,
        NotificationComponent,
        FilterButtonComponent,
        FilterDialogComponent,
    ],
    exports: [
        AvatarComponent,
        DateInfoComponent,
        FilterInputComponent,
        FilterTabComponent,
        HeaderComponent,
        LogoComponent,
        NavBarComponent,
        PaymentsTableComponent,
        PaginatorComponent,
        UserInfoComponent,
        FilterButtonComponent,
    ],
    imports: [
        CommonModule,
        NgxDatatableModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        CurrencyMaskModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        MatNativeDateModule,
        NgxMatNativeDateModule,    
        MatSnackBarModule,
        TranslateModule,
        MatMenuModule
    ],
    entryComponents: [
        AddPaymentComponent,
        DeletePaymentComponent
    ]
})
export class SharedModule {}
