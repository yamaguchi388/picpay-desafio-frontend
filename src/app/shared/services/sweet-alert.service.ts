import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult, SweetAlertIcon } from 'sweetalert2';

interface IShow {
  confirmButtonClass?: string;
  cancelButtonClass?: string;
  title?: string;
  text?: string;
  html?: string;
  icon?: SweetAlertIcon;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  public show(params: IShow): Promise<SweetAlertResult> {
    const customAlert = Swal.mixin({
      customClass: {
        confirmButton: params.confirmButtonClass || 'btn btn-primary',
        cancelButton: params.cancelButtonClass || 'btn btn-outline-danger me-4',
      },
      buttonsStyling: false,
    });

    return customAlert.fire({
      title: params?.title,
      text: params.text,
      html: params?.html,
      icon: params?.icon || 'info',
      showCancelButton: params?.showCancelButton || false,
      confirmButtonText: params?.confirmButtonText || 'OK',
      cancelButtonText: params?.cancelButtonText || 'Cancelar',
      reverseButtons: true,
    });
  }
}
