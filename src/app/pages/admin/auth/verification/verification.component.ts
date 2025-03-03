import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { LayoutService } from 'src/app/pages/layout/service/app.layout.service';

@Component({
    templateUrl: './verification.component.html'
})
export class VerificationComponent {

    constructor(private layoutService: LayoutService) {}

    get filledInput(): boolean {
        return this.layoutService.config.inputStyle === 'filled';
    }

    focusOnNext(inputEl: InputNumber){
        inputEl.input.nativeElement.focus();
    }

}
