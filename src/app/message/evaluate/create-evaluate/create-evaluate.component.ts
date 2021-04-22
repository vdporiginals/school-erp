import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
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
    constructor(
        private http: HttpClient,
        private route: Router,
        private alertCtrl: AlertController
    ) { }

    ngOnInit() { }

    onSave = () => {
        this.model.status = true;
        this.model.date = new Date().toISOString();
        this.http.post(`https://5f508ff82b5a260016e8bae9.mockapi.io/evaluate`, this.model).subscribe(async res => {
            const alert = await this.alertCtrl.create({
                header: 'Thông báo',
                subHeader: 'Thành công',
                message: 'Thêm lịch nghỉ thành công.',
                buttons: [
                    {
                        text: 'OK',
                        handler: async (blah) => {
                            this.route.navigateByUrl('message/evaluate');
                        }
                    }
                ]
            });
            await alert.present();
        })
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
        HearderEvalueteModule,
        IonicModule
    ],
    exports: [
        CreateEvaluateComponent
    ]
})
export class CreateEvaluateModule { }