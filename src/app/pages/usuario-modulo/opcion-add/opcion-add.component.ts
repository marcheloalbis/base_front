import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Opcion } from '../models/opcion.model';
import { OpcionService } from '../services/opcion.service';

@Component({
  selector: 'app-opcion-add',
  templateUrl: './opcion-add.component.html',
  styleUrls: ['./opcion-add.component.scss']
})
export class OpcionAddPage {

  constructor (private opcionService:OpcionService, private router: Router) {}

  opcion: Opcion = {} as Opcion;
  loading: boolean = false;


  save () {
    this.opcionService.add(this.opcion).subscribe (
      data => {
        console.log ('SE guardo el rol', data);
        this.onBack();
      },
      error=> {
        console.log ('Algunos datos estan erroneos');
      }
    );
  }

  onBack () {
    this.router.navigate(['opcion']);
  }

}
