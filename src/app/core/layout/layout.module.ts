import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { PpNavbarComponent } from './components/navbar/pp-navbar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    PpNavbarComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
