import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { appRoutes } from './app-routes/app-routes';
import { reducers } from './store';
import { CustomSerializer, RouterEffects } from './store/app-routes';
import { ProfileEffects } from './store/profile';

import { AppComponent } from './app.component';
import { HeaderModule } from './UI/header/header.module';
import { LandingModule } from './pages/landing/landing.module';
import { SignUpModule } from './pages/sign-up/sign-up.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([
      ProfileEffects,
      RouterEffects,
    ]),
    StoreRouterConnectingModule,

    HeaderModule,
    LandingModule,
    SignUpModule,

  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
