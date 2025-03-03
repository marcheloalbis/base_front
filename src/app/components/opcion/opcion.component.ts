import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Opcion } from 'src/app/pages/usuario-modulo/models/opcion.model';
import { OpcionService } from 'src/app/pages/usuario-modulo/services/opcion.service';

@Component({
  selector: 'admin-opciones',
  templateUrl: './opcion.component.html',
  styleUrls: ['./opcion.component.scss']
})
export class OpcionComponent implements OnInit {

  constructor (private opcionService: OpcionService) {
    
  }

  isAdd:boolean = false;
  listOpcion: Opcion [] = [];
  listBoolean: boolean [] = [];


  @Output() changeList: EventEmitter <Opcion [] > = new EventEmitter<Opcion [] >()

  showAdd () {
    this.isAdd = !this.isAdd;
  }

  ngOnInit(): void {
    this.loadOpciones();
  }

/*   hideAgregar () {
    this.listOpcion.push(this.obj);
    this.obj = {} as Opcion;
    this.isAdd = false;
  } */
  
  loadOpciones () {

    this.opcionService.getList().subscribe ( data => {
      console.log( 'DATA: ', data);
      this.listOpcion = data;
      this.listBoolean = new Array(this.listOpcion.length).fill(false);
    });

  }
  
  changeSelect (evt: any, index: any) {
    const isChecked = evt.target.checked;
    this.listOpcion[index].seleccionado = isChecked;
    this.changeList.emit(this.listOpcion);
  }

/*   selectObject (index:number) {
    console.log('event: ', isChecked, ' index ', index );
  } */
}
