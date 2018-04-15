import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { SprintsComponent } from './sprints.component';
import { SprintsContainer } from './sprints.container';
import { ChartComponent } from './chart-component/chart.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SprintsComponent,
    SprintsContainer,
    ChartComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MDBBootstrapModule,
  ],
  exports: [
    SprintsComponent,
    SprintsContainer,
    ChartComponent
  ],
})

export class SprintsModule { }
