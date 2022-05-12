import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './header.component';

const declarations = [HeaderComponent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, MatMenuModule, MatButtonModule],
})
export class HeaderModule {}
