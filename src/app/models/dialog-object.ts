import { PaymentObject } from './payment-object';
export interface DialogObject {
    add: boolean;
    edit: boolean;
    delete: boolean;
    payment?: PaymentObject;
}
