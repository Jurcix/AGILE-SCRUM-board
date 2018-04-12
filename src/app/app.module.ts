import { AuthService } from './authentication/auth.service';
import { RequestInterceptorService } from './authentication/request-interceptor.service';
import { reducers } from './store/index';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { appRoutes } from './app-routes/app-routes';
import { CustomSerializer, RouterEffects } from './store/app-routes';
import { ProfileEffects } from './store/profile';

import { AppComponent } from './app.component';
import { HeaderModule } from './UI/header/header.module';
import { LandingModule } from './pages/landing/landing.module';
import { SignUpModule } from './pages/sign-up/sign-up.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';




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
    StoreDevtoolsModule.instrument(),

    HeaderModule,
    LandingModule,
    SignUpModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
