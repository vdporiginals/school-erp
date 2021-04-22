import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { EvalueteService } from '../evaluete.service';

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
        public loadingController: LoadingController,
        private service: EvalueteService
    ) { }

    listEvaluate: any = []

    async ngOnInit() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Vui lòng chờ...',
            duration: 5000
        });
        await loading.present();
        this.service.list(1, 200).subscribe(res => {
            this.listEvaluate = res;
        }, () => { }, () => { loading.dismiss() })
    }

}
