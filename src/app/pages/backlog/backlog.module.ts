import { CommonModule } from '@angular/common';
import { BacklogComponent } from './../../pages/backlog/backlog.component';
import { BacklogContainer } from './../../pages/backlog/backlog.container';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatChipsModule,
  MatCheckboxModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BacklogComponent,
    BacklogContainer,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [
    BacklogComponent,
    BacklogContainer,
  ]
})
export class BacklogModule {

}
