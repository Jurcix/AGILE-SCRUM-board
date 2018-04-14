import { LandingContainer } from '../pages/landing/landing.container';
import { SignUpContainer } from '../pages/sign-up/sign-up.container';
import { DashboardContainer } from '../pages/dashboard/dashboard.container';
import { ProjectSummaryContainer } from '../pages/project-summary/project-summary.container';

export const appRoutes = [
  { path: 'home', component: LandingContainer },
  { path: 'sign-up', component: SignUpContainer },
  { path: 'dashboard', component: DashboardContainer },
  { path: 'project/:id', component: ProjectSummaryContainer },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
