import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './pages/layout/app.layout.module';
import { HomePageComponent } from './pages/demo-modulo/home-page/home-page.component';
import {CookieService} from 'ngx-cookie-service';
import { PagesModule } from './pages/pages.module';
import { UsuariosPageModule } from './pages/usuario-modulo/usuarios-admin.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DashboardComponent,
  ],
  imports: [
    AppLayoutModule,
    AppRoutingModule,
    PagesModule,
    UsuariosPageModule,
  ],
  providers: [
    CookieService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
