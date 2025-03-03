import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Rol } from '../models/rol.model';
import { RolService } from '../services/rol.service';

@Component({
  selector: 'app-rol-add',
  templateUrl: './rol-add.component.html',
  styleUrls: ['./rol-add.component.scss']
})
export class RolAddPage {
  constructor (private rolService:RolService, private router: Router) {}

  rol: Rol = {} as Rol;
  loading: boolean = false;


  save () {
    console.log( 'Roles ', this.rol);
    this.rolService.add(this.rol).subscribe (
      data => {
        console.log ('Se guardo el rol', data);
        this.gotoRol();
      }
    );
  }

  updateOpcion (evt:any) {
    this.rol.opciones = this.formatear(evt);
/*     console.log('List: ', JSON.stringify(evt, null, 4) );
    console.log('List: ', JSON.stringify(this.formatear(evt), null, 4) ); */
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

  gotoRol () {
    // this.router.navigate(['rol-add'], { relativeTo: this.route });
    this.router.navigate(['rol']);
  }
  

}
