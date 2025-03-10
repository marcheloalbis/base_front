import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewPasswordComponent } from './newpassword.component';
import { NewPasswordRoutingModule } from './newpassword-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { AppConfigModule } from 'src/app/pages/layout/config/config.module';

@NgModule({
    imports: [
        CommonModule,
        NewPasswordRoutingModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        RippleModule,
        AppConfigModule,
        PasswordModule
    ],
    declarations: [NewPasswordComponent]
})
export class NewPasswordModule { }
