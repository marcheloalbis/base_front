import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioPage implements OnInit{

  listUser: any[] = [];

  // listUser: any[] = [{ name: 'Jose Vargas' }, { name: 'Alejandro' }];

  loading: boolean = false;
  @ViewChild('filter') filter!: ElementRef;

  constructor (private usuarioService: UsuarioService, private httpClient:HttpClient, private router: Router) {

  }
  ngOnInit(): void {
    this.populateUsers();
  }

  populateUsers (){
/*     this.usuarioService.getListUser().subscribe ({
      next: this.readData,
      error: this.errorConection
    }); */

    this.usuarioService.getListUser().subscribe (
      data => {
        this.listUser = data;
      }, error => {
        
      }
    );
  }

  readData (data:any) {
    this.listUser = data as any[];
    console.log('listUser: ', JSON.stringify(this.listUser, null, 4) );
  }

  assignRole(user: any) {
    const queryParams = {
      userId: user.id
    };
    this.router.navigate(['usuario-add'], { queryParams: queryParams });
  }

/*   editUser (user: any) {
    const queryParams = {
      userId: user.id
    };
    this.router.navigate(['usuario-add'], { queryParams: queryParams });
  } */

  errorConection (error:any) {
    console.log(error);
  }

  add () {
    this.router.navigate(['usuario-add']);
  }

  clear(table: Table) {
    //table.clear();
    //this.filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    // table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
