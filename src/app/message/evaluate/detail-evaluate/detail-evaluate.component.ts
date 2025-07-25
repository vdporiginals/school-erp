import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/storage/localstorage.service';
import { EvalueteService } from '../evaluete.service';
import { HearderEvalueteModule } from '../hearder-evaluete/hearder-evaluete.component';

@Component({
    selector: 'app-detail-evaluate',
    templateUrl: './detail-evaluate.component.html',
    styleUrls: ['./detail-evaluate.component.scss'],
    standalone: false
})
export class DetailEvaluateComponent implements OnInit, OnDestroy {
  curUser: Observable<any>;
  configHeader: any = {
    title: 'Chi tiết đơn xin nghỉ',
    btnLeft: {
      show: true,
      icon: 'assets/icon/icon-back-page.svg',
      router: '/tabs/message/evaluate',
    },
  };
  model: any = {};
  constructor(
    private storage: LocalStorageService,
    private http: HttpClient,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router,
    private service: EvalueteService
  ) {}

  async ngOnInit() {
    this.curUser = this.storage.userToken.asObservable();
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Vui lòng chờ...',
      duration: 5000,
    });
    await loading.present();
    const id = this.route.snapshot.params.id;
    this.service.list(1, 222).subscribe(
      (res) => {
        this.model = res.find((x) => x.LeaveId == id);
      },
      () => {},
      () => {
        loading.dismiss();
      }
    );
  }

  ngOnDestroy() {}
  onSave = async () => {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Vui lòng chờ...',
      duration: 5000,
    });
    let mes;

    if (this.storage.getToken().UserProfileId == '2323') {
      mes = 'Cập nhật thành công!';
    } else {
      mes = 'Phê duyệt thành công!';
      this.model.Type = 2;
    }

    await loading.present();
    this.service.update(this.model.LeaveId, this.model).subscribe(
      async (res) => {
        const alert = await this.alertCtrl.create({
          header: 'Thông báo',
          subHeader: 'Thành công',
          message: mes,
          buttons: [
            {
              text: 'OK',
              handler: async (blah) => {
                this.router.navigateByUrl('/tabs/message/evaluate');
              },
            },
          ],
        });
        await alert.present();
      },
      () => {},
      () => {
        loading.dismiss();
      }
    );
  };
}
@NgModule({
  declarations: [DetailEvaluateComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HearderEvalueteModule,
    IonicModule,
  ],
  exports: [DetailEvaluateComponent],
})
export class DetailEvaluateModule {}
