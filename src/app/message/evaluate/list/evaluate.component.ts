import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-evaluate',
    templateUrl: './evaluate.component.html',
    styleUrls: ['./evaluate.component.scss'],
})
export class EvaluateComponent implements OnInit {
    configHeader = {
        title: 'Đơn xin nghỉ học',
        btnLeft: {
            show: true,
            icon: 'assets/icon/icon-back-page.svg',
            router: '/message'
        },
        btnRight: {
            show: true,
            icon: 'assets/icon/icon-add.svg',
            router: 'create'
        }
    }

    constructor(
        private http: HttpClient,
        public loadingController: LoadingController
    ) { }

    listEvaluate: any = []

    async ngOnInit() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Vui lòng chờ...',
            duration: 5000
        });
        await loading.present();
        this.http.get(`https://5f508ff82b5a260016e8bae9.mockapi.io/evaluate`).subscribe(res => {
            this.listEvaluate = res;
        }, () => { }, () => { loading.dismiss() })
    }

}
