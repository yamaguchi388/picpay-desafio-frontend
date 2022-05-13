import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PicpayButtonComponent } from './picppay-button.component';

@NgModule({
    declarations: [PicpayButtonComponent],
    exports: [PicpayButtonComponent],
    imports: [CommonModule],
})
export class PicpayButtonModule {}
