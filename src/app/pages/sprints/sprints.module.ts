import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { SprintsComponent } from './sprints.component';
import { SprintsContainer } from './sprints.container';
import { ChartComponent } from './chart-component/chart.component';

@NgModule({
  declarations: [
    SprintsComponent,
    SprintsContainer,
    ChartComponent
  ],
  imports: [
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
