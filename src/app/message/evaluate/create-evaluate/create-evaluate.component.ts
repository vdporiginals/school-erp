import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HearderEvalueteModule } from '../hearder-evaluete/hearder-evaluete.component';

@Component({
    selector: 'app-create-evaluate',
    templateUrl: './create-evaluate.component.html',
    styleUrls: ['./create-evaluate.component.scss'],
})
export class CreateEvaluateComponent implements OnInit {
    configHeader = {
        title: 'Tạo đơn xin nghỉ học',
        btnLeft: {
            show: true,
            icon: 'assets/icon/icon-back-page.svg',
            router: '/message/evaluate'
        },
        btnRight: {
            show: false,
            icon: 'assets/icon/icon-add.svg',
            router: 'create'
        }
    }

    model: any = {};
    constructor() { }

    ngOnInit() {
        this.model.startDate = '1990-02-19T07:43Z';
        this.model.endDate = '2020-02-19T07:43Z';
        this.model.note = 'note'
    }

    onSave = () => {
        console.log(this.model);
    }
}

@NgModule({
    declarations: [
        CreateEvaluateComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HearderEvalueteModule
    ],
    exports: [
        CreateEvaluateComponent
    ]
})
export class CreateEvaluateModule { }