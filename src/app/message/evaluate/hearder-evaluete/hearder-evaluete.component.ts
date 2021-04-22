import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnChanges, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-hearder-evaluete',
    templateUrl: './hearder-evaluete.component.html',
    styleUrls: ['./hearder-evaluete.component.scss'],
})
export class HearderEvalueteComponent {
    @Input() config: any = {}
}
@NgModule({
    declarations: [
        HearderEvalueteComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        IonicModule
    ],
    exports: [
        HearderEvalueteComponent
    ]
})
export class HearderEvalueteModule { }