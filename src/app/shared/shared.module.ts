import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './components/form-input/form-input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormFieldErrorMsgComponent } from './components/form-field-error-msg/form-field-error-msg.component';
import { ModalComponent } from './components/modal/modal.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { UserPhotoComponent } from './components/user-photo/user-photo.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SpinLoaderComponent } from './components/spin-loader/spin-loader.component';
import { MessageAlertComponent } from './components/message-alert/message-alert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormInputComponent,
    ButtonComponent,
    FormFieldErrorMsgComponent,
    ModalComponent,
    SearchInputComponent,
    TablePaginationComponent,
    UserPhotoComponent,
    ToolbarComponent,
    SpinLoaderComponent,
    MessageAlertComponent,
  ],
  exports: [
    FormInputComponent,
    ButtonComponent,
    FormFieldErrorMsgComponent,
    ModalComponent,
    SearchInputComponent,
    TablePaginationComponent,
    UserPhotoComponent,
    ToolbarComponent,
    SpinLoaderComponent,
    MessageAlertComponent,
  ]
})
export class SharedModule { }
