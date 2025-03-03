import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/demo-modulo/home-page/home-page.component';
import { AppLayoutComponent } from './pages/layout/app.layout.component';
import { OpcionAddPage } from './pages/usuario-modulo/opcion-add/opcion-add.component';
import { OpcionesListPage } from './pages/usuario-modulo/opciones/opcion-list.component';
import { RolAddPage } from './pages/usuario-modulo/rol-add/rol-add.component';
import { RolPage } from './pages/usuario-modulo/rol/rol.component';
import { UsuarioAddPage } from './pages/usuario-modulo/usuario-add/usuario-add.component';
import { UsuarioPage } from './pages/usuario-modulo/usuario/usuario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditorComponent } from './components/editor/editor.component';

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
        //{ path: '', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
        {
          path:  'home',
          component: HomePageComponent
        },
        {
          path: 'user',
          component: UsuarioPage
        },
        {
          path: 'usuario-add',
          component: UsuarioAddPage 
        },
        {
          path: 'rol',
          component: RolPage
        },
        {
          path: 'rol-add',
          component: RolAddPage
        },
        {
          path: 'opcion',
          component: OpcionesListPage
        },
        {
          path: 'opcion-add',
          component: OpcionAddPage 
        },  
        {
          path: 'editor',
          component: EditorComponent 
        }, 
        {
          path: 'dashboard',
          component: DashboardComponent 
        },  
        
    ]
  },
  { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./pages/admin/auth/auth.module').then(m => m.AuthModule) },
  // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
  { path: 'notfound', loadChildren: () => import('./pages/admin/notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
