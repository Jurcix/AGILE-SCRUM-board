import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { SignUpContainer } from './sign-up.container';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  declarations: [
    SignUpContainer,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
  ],
  exports: [
    SignUpContainer,
    SignUpComponent,
  ],
})

export class SignUpModule { }
