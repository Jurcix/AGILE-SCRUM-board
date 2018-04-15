import { ReactiveFormsModule } from '@angular/forms';
import { ProjectSummaryComponent } from './project-summary.component';
import { NgModule } from '@angular/core';
import { ProjectSummaryContainer } from './project-summary.container';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  declarations: [
    ProjectSummaryComponent,
    ProjectSummaryContainer,
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
  ],
  exports: [
    ProjectSummaryComponent,
    ProjectSummaryContainer,
  ]
})
export class ProjectSummaryModule {

}
