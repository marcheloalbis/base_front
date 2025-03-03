import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Rol } from 'src/app/pages/usuario-modulo/models/rol.model';
import { RolService } from 'src/app/pages/usuario-modulo/services/rol.service';

@Component({
  selector: 'admin-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnChanges {

  constructor (private rolService: RolService) {
  }


  ngOnChanges(changes: SimpleChanges): void {
/*     if (changes['listRolUser']) {
      this.loadRoles(this.listRolUser, this.listRol);
    } */
  }

  loadRoles (listRolUser: Rol [], listRol: Rol []) {
    if (!listRolUser) return listRol;
    if (listRolUser.length===0 || listRol.length ===0) return listRol;
    listRolUser.forEach(element => {
      for (let i = 0; i < listRol.length; i++) {

        if (this.listRol[i].id === element.id) {
          console.log('------------ ', this.listRol[i].id , element.id)
          this.listRol[i].seleccionado = true;
          break;
        }
        
      }
    });
    return listRol;
  }

  @Input()
  listRolUser: Rol [] = [];
  listRol: Rol [] = [];
  listBoolean: boolean [] = [];
  @Output() changeList: EventEmitter <Rol [] > = new EventEmitter<Rol [] >();

  @Input() isEdit: boolean = false;
  @Input() setList:Rol[] = [];


  ngOnInit(): void {
    this.loadOpciones();
  }

  loadOpciones () {
    if (this.isEdit) {
      this.listRol = this.setList;
      this.listBoolean = new Array(this.listRol.length).fill(false);
    } else {
      this.rolService.getList().subscribe ( data => {
        this.listRol = data;
        this.listBoolean = new Array(this.listRol.length).fill(false);
        console.log('Roles LOAD: ', this.listRolUser, this.listRol);
        this.listRol = this.loadRoles(this.listRolUser, this.listRol);
      });
    }

  }

  changeSelect (evt: any, index: any) {
    const isChecked = evt.target.checked;
    this.listRol[index].seleccionado = isChecked;
    this.changeList.emit(this.listRol);
  }

}
