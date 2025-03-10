import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
// import { UsuarioPage } from './usuario-modulo/usuario/usuario.component';
import { TableModule } from 'primeng/table';
import { ComponentsModule } from '../components/components.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { EditorModule } from 'primeng/editor';
import { DemoPage } from './demo/demo.component';
import { FormsModule } from '@angular/forms';

const page: any []= [
  DemoPage
];

@NgModule({
  declarations: page,
  imports: [
    CommonModule,
    ComponentsModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    FormsModule,
    EditorModule,
    AvatarModule
  ],
  providers: [
  ],
  bootstrap: [PagesModule]
})
export class PagesModule { }