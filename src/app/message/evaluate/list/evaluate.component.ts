import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { EvalueteService } from '../evaluete.service';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss'],
})
export class EvaluateComponent implements OnInit {
  configHeader: any = {
    title: 'Đơn xin nghỉ học',
    btnLeft: {
      show: true,
      icon: 'assets/icon/icon-back-page.svg',
      router: '/tabs/message',
    },
    btnRight: {
      show: true,
      icon: 'assets/icon/Group-4598.svg',
      router: 'create',
    },
  };

  constructor(
    public loadingController: LoadingController,
    private service: EvalueteService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(() => {
      this.init();
    });
  }

  listEvaluate: any = [];

  async ngOnInit() {
    this.init();
  }

  async init() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Vui lòng chờ...',
      duration: 5000,
    });
    await loading.present();
    this.service.list(1, 200).subscribe(
      (res) => {
        this.listEvaluate = res;
      },
      () => {},
      () => {
        loading.dismiss();
      }
    );
  }
}
