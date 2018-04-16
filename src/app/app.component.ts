import { AppState } from './store/index';
import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/';
import { Store } from '@ngrx/store';
import { getRouterState } from './store/app-routes';
import { pathOr } from 'ramda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn;
  isUnderProject;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(getRouterState).subscribe((route) => {
      this.isUnderProject = pathOr(false, ['state', 'params', 'id'], route);
    });

  }
}
