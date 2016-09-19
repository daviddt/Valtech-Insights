import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { InsightsComponent } from './insights/insights.component';
import { OverPlannedComponent } from './overplanned/overplanned.component';
import { ExpertiseFinderComponent } from './expertisefinder/expertisefinder.component';

import { AuthGuard } from './../common/auth/auth.guard';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard] , children: [
    { path: 'insights', component: InsightsComponent },
    { path: 'overplanned', component: OverPlannedComponent },
    { path: 'expertise-finder', component: ExpertiseFinderComponent }
  ]},
  { path: 'dashboard', redirectTo: '/dashboard/insights', pathMatch: 'full' },
  { path: '', redirectTo: '/dashboard/insights', pathMatch: 'full' },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);