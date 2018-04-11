import { LandingContainer } from './../pages/landing/landing.container';
import { SignUpContainer } from './../pages/sign-up/sign-up.container';
import { DashboardContainer } from '../pages/dashboard/dashboard.container';

export const appRoutes = [
  { path: 'home', component: LandingContainer },
  { path: 'sign-up', component: SignUpContainer },
  { path: 'dashboard', component: DashboardContainer },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
