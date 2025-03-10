import { Component } from '@angular/core';
import { LayoutService } from 'src/app/pages/layout/service/app.layout.service';


@Component({
	templateUrl: './forgotpassword.component.html'
})
export class ForgotPasswordComponent {

	constructor(private layoutService: LayoutService) { }

	get filledInput(): boolean {
		return this.layoutService.config.inputStyle === 'filled';
	}

}
