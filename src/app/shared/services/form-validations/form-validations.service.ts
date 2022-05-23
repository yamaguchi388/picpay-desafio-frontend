import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationsService {

  constructor() { }

  getErrorMsg(fieldName: string, errors: ValidationErrors | null) {
    return errors?.email
      ? 'Email está inválido'
      : errors?.required
      ? `${fieldName} é obrigatório`
      : '';
  }
}
