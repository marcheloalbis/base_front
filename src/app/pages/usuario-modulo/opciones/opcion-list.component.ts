import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Opcion } from '../models/opcion.model';
import { OpcionService } from '../services/opcion.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opcion-list.component.html',
  styleUrls: ['./opcion-list.component.scss']
})
export class OpcionesListPage implements OnInit{
  constructor (private opcionService:OpcionService, private router: Router) {}

  ngOnInit(): void {
    this.getList();
  }

  opcionList: Opcion[] = [];
  loading: boolean = false;


  getList () {
    this.opcionService.getList().subscribe (
      data=> {
        console.log ('Lista de roles', data);
        this.opcionList = data;
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

  newOpcion () {
    this.router.navigate(['opcion-add']);
  }
}
