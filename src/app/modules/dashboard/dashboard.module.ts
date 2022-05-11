import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';


const COMPONENTS = [DashboardComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, DashboardRoutingModule, RouterModule],
})
export class DashboardModule {}
