import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders }  from './app.routing';

import { LoginModule } from  './login/login.module';
import { DashboardModule } from  './dashboard/dashboard.module';

import { AuthGuard } from './common/auth/auth.guard';
import { AuthService } from './common/auth/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,

    DashboardModule,
    LoginModule,

    routing,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    AuthService,
    AuthHttp, 
    AUTH_PROVIDERS,
    provideAuth({
      headerName: 'X-AUTH-TOKEN',
      headerPrefix: ' ',
      globalHeaders: [{'Content-Type':'application/json'}],
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
