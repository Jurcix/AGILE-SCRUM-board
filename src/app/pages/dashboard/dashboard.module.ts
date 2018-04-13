import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { DashboardComponent } from './dashboard.component';
import { DashboardContainer } from './dashboard.container';
import {
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatIconModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardContainer,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatChipsModule,

  ],
  exports: [
    DashboardComponent,
    DashboardContainer,
  ]
})

export class DashboardModule { }
