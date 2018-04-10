import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { LandingContainer } from './landing.container';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [
    LandingContainer,
    LandingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
  ],
  exports: [
    LandingContainer,
    LandingComponent,
  ]
})

export class LandingModule { }
