import { ActivatedRoute } from '@angular/router';
import { AppState } from './../../store/index';
import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { Go, getRouterState } from '../../store/app-routes';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  @Input() isLoggedIn = false;
  @Input() isProjectSelected = false;

  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute,
  ) { }

  goToProjectSummary() {
    let id;
    this.store.select(getRouterState).subscribe(value => id = value.state.params.id);
    this.store.dispatch(new Go({ path: [`project/${id}`]}));
  }

  goToBacklog() {
    let id;
    this.store.select(getRouterState).subscribe(value => id = value.state.params.id);
    this.store.dispatch(new Go({ path: [`project/${id}/backlog`] }));
  }

  goToSprints() {
    let id;
    this.store.select(getRouterState).subscribe(value => id = value.state.params.id);
    this.store.dispatch(new Go({ path: [`project/${id}/sprints`] }));
  }

  goToDashboard() {
    this.store.dispatch(new Go({ path: ['/dashboard'] }));
  }
}
