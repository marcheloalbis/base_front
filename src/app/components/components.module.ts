import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { OpcionComponent } from './opcion/opcion.component';
import { RolesComponent } from './roles/roles.component';
import { EditorComponent } from './editor/editor.component';
// import { UsuarioPage } from './usuario-modulo/usuario/usuario.component';

const componentes: any []= [
    OpcionComponent,
    RolesComponent,
    EditorComponent,
];

@NgModule({
  declarations: componentes,
  imports: [
    FormsModule,
    CommonModule,
    TableModule
  ],
  exports: componentes
})
export class ComponentsModule { }