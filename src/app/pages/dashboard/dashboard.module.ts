import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { DashboardComponent } from './dashboard.component';
import { DashboardContainer } from './dashboard.container';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardContainer,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
  ],
  exports: [
    DashboardComponent,
    DashboardContainer,
  ]
})

export class DashboardModule { }
