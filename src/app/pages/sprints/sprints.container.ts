import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/';

import { AppState } from '../../store';
import { SprintSummary, Sprints } from '../../types/sprint';
import { SprintListRequest, SprintCreatetRequest } from './../../store/sprints/actions';
import { getSprintSummaries } from './../../store/sprints/selectors';

@Component({
  selector: 'app-sprints',
  template: `
    <app-sprints-component
      [sprints]="sprints$ | async"
      (addSprints)=addSprints($event)>
    </app-sprints-component>
  `,
  styleUrls: [],
})
export class SprintsContainer implements OnInit {
  constructor(private store: Store<AppState>) {}

  sprints$: Observable<SprintSummary[]>;

  ngOnInit() {
    this.store.dispatch(new SprintListRequest);
    this.sprints$ = this.store.select(getSprintSummaries);
  }

  addSprints(sprints: Sprints) {
    this.store.dispatch(new SprintCreatetRequest(sprints));
  }
}
