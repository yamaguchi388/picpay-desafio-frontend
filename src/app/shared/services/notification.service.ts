/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  toastrOptions = {
    progressBar: true,
    enableHtml: true,
    closeButton: true
  };

  constructor(
    private toastr: ToastrService //private translate: TranslateService
  ) {}

  success(message, title = 'Sucesso') {
    this.toastr.success(message, title, this.toastrOptions);
  }

  error(message, title = 'Erro') {
    this.toastr.error(message, title, this.toastrOptions);
  }

  info(message, title = 'Aviso') {
    this.toastr.info(message, title, this.toastrOptions);
  }

  warning(message, title = 'Alerta') {
    this.toastr.warning(message, title, this.toastrOptions);
  }
}
