import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Rol } from '../models/rol.model';
import { RolService } from '../services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolPage implements OnInit {

  constructor (private rolService:RolService, private router: Router) {}

  ngOnInit(): void {
    this.getList();
  }

  rolesList: Rol[] = [];
  loading: boolean = false;


  getList () {
    this.rolService.getList().subscribe (
      data=> {
        console.log ('Lista de roles', data);
        this.rolesList = data;
      }
    );
  }

  onGlobalFilter(table: Table, event: Event) {
    // table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    //table.clear();
    //this.filter.nativeElement.value = '';
  }

  newRol () {
    // this.router.navigate(['rol-add'], { relativeTo: this.route });
    this.router.navigate(['rol-add']);
  }

}
