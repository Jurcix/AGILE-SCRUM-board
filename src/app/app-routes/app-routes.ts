import { LandingContainer } from './../pages/landing/landing.container';
import { SignUpContainer } from './../pages/sign-up/sign-up.container';

export const appRoutes = [
  { path: 'home', component: LandingContainer },
  { path: 'sign-up', component: SignUpContainer },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
