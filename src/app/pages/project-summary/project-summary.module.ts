import { ProjectSummaryComponent } from './project-summary.component';
import { NgModule } from '@angular/core';
import { ProjectSummaryContainer } from './project-summary.container';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    ProjectSummaryComponent,
    ProjectSummaryContainer,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
  ],
  exports: [
    ProjectSummaryComponent,
    ProjectSummaryContainer,
  ]
})
export class ProjectSummaryModule {

}
