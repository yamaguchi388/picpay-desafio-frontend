import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from '../pages/login/login.component';
import {  MyPaymentsComponent } from './../pages/my-payments/my-payments.component';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderComponent } from './../components/molecules/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DialogEdit} from './../components/molecules/dialog/dialog-edit/dialog-edit.component';
import {DialogDelete} from './../components/molecules/dialog/dialog-delete/dialog-delete.component';

import {TasksService} from './../services/tasks/tasks.service';
import { Button } from 'src/components/atoms/button/button.component';
import { DialogAdd } from 'src/components/molecules/dialog/dialog-add/dialog-add.component';

@NgModule({
  declarations: [	
    AppComponent, LoginComponent, MyPaymentsComponent, HeaderComponent, DialogEdit, DialogDelete, Button, DialogAdd
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
