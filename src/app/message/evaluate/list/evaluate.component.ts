import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
        private http: HttpClient
    ) { }

    listEvaluate: any = []

    ngOnInit() {
        this.http.get(`https://5f508ff82b5a260016e8bae9.mockapi.io/evaluate`).subscribe(res => {
            this.listEvaluate = res;
        })
    }

}
