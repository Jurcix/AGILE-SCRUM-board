import { LandingContainer } from './../pages/landing/landing.container';
import { SignUpContainer } from './../pages/sign-up/sign-up.container';
import { DashboardContainer } from '../pages/dashboard/dashboard.container';
import { SprintsContainer } from '../pages/sprints/sprints.container';

export const appRoutes = [
  { path: 'home', component: LandingContainer },
  { path: 'sign-up', component: SignUpContainer },
  { path: 'dashboard', component: DashboardContainer },
  { path: 'sprints', component: SprintsContainer },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
