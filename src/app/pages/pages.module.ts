import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
// import { UsuarioPage } from './usuario-modulo/usuario/usuario.component';
import { TableModule } from 'primeng/table';
import { ComponentsModule } from '../components/components.module';

const page: any []= [
    // UsuarioPage
];

@NgModule({
  declarations: page,
  imports: [
    CommonModule,
    ComponentsModule,
    ButtonModule,
    TableModule
  ],
  providers: [
  ],
  bootstrap: [PagesModule]
})
export class PagesModule { }