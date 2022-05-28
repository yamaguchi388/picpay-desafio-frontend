import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StateModule } from './state/state.module';

const modules = [StateModule];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class CoreModule {}
