import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from "primeng/inputtextarea";
import { TableModule } from 'primeng/table';
import { ComponentsModule } from 'src/app/components/components.module';
import { OpcionAddPage } from './opcion-add/opcion-add.component';
import { OpcionesListPage } from './opciones/opcion-list.component';
import { RolAddPage } from './rol-add/rol-add.component';
import { RolPage } from './rol/rol.component';
import { UsuarioAddPage } from './usuario-add/usuario-add.component';
import { UsuarioPage } from './usuario/usuario.component';

const pages: any []= [
    UsuarioPage,
    RolPage,
    RolAddPage,
    OpcionAddPage,
    OpcionesListPage,
    UsuarioAddPage,
];

@NgModule({
  declarations: pages,
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
  ],
  providers: [
  ]
})
export class UsuariosPageModule { }