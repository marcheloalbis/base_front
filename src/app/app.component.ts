import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs';
import { AppRouterService } from './services/AppRouterService';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig,
    private router: Router,
    private cookieService: CookieService
    ) { 
  }

  ngOnInit(): void {
      this.primengConfig.ripple = true;
      
/*       this.router.events.subscribe((event) => {
        console.log('Resolve: ', event);
      }); */

      this.router.events
      .pipe(filter(event => event instanceof RoutesRecognized))
      .subscribe((event) => {
        // console.log(event);
        console.log('Resolve: ', event);
        // this.checkValidtoken();
      });
      this.checkValidtoken();
  }

  checkValidtoken () {
    let obj = this.cookieService.get('session');
    if (obj) {
      // this.router.navigate(['/']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
