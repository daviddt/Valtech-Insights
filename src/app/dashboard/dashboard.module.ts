import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule  } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';

import { InsightsModule } from './insights/insights.module';

import { routing, appRoutingProviders }  from './dashboard.routing';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    InsightsModule,
    routing
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    MenuComponent
  ],
  providers: [
    appRoutingProviders
  ],
})
export class DashboardModule { }
