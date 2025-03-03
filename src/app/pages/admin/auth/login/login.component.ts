import { Component } from '@angular/core';
import { LayoutService } from 'src/app/pages/layout/service/app.layout.service';
import { LoginService } from '../../services/login-service.service';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent {

	constructor(private layoutService: LayoutService, 
		private loginService: LoginService, 
		private cookieService: CookieService,
		private router: Router,
		) {}

	get filledInput(): boolean {
		return this.layoutService.config.inputStyle === 'filled';
	}

	user: string = '';
	pass: string = '';

	loginForm () {
		this.loginService.login(this.user, this.pass)
		.subscribe( {
			next :  data=> {
				// console.log('token', data);
				this.saveCookie(data.data);
			},
			error: error=> {
				console.log('error', error);
			}
		}
		);
	}

	saveCookie (token:any) {
		this.cookieService.set('session', token);
		this.router.navigate(['/']);
	} 

}
