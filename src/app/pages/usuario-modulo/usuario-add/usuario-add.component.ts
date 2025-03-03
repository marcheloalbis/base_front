import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { RolService } from '../services/rol.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.scss']
})
export class UsuarioAddPage implements OnInit{

  usuario: Usuario = {} as Usuario;
  esNuevo: boolean = true;

  constructor (private usuarioService: UsuarioService, private rolService: RolService, private router: Router, private route: ActivatedRoute) {}

/*   constructor (private rolService:RolService) {} */

  save () {
    console.log( 'Roles ', this.usuario);
    this.usuarioService.add(this.usuario).subscribe (
      data => {
        console.log ('Se guardo el rol', data);
        this.goToAdd();
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const param1 = params['userId'];
      console.log('PARAM: ',param1);
      if (param1) {
        this.esNuevo = false;
        this.loadUser(param1);
      }
    });
  }

  goToAdd () {
    this.router.navigate(['user']);
  }

  userRoles:any = [];
  loadUser (ide: number) {
    this.usuarioService.getOnlyUser(ide).subscribe (
      data => {
        console.log ('Usuario: ', data);
        this.usuario = data.user;
        this.userRoles = data.roles;
      }
    );
/*     this.rolService.getRoleByUser(ide+'').subscribe(
      data => {
        console.log('ROLES USUARIO: ', data)
        // this.usuario.roles = data;
      }
    ); */
  }

  

  updateList (evt:any) {
    console.log('Roles', JSON.stringify( this.formatear(evt), null, 4));
    this.usuario.roles = this.formatear(evt);
  }

  formatear (array: any) {
    let resp : any [] = [];
    array.forEach((obj:any) => {
      if (obj.seleccionado) {
        resp.push(obj.id); 
      }
    });
    return resp;
  }

}
