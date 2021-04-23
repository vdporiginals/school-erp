import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { EvalueteService } from '../evaluete.service';
import { HearderEvalueteModule } from '../hearder-evaluete/hearder-evaluete.component';

@Component({
  selector: 'app-create-evaluate',
  templateUrl: './create-evaluate.component.html',
  styleUrls: ['./create-evaluate.component.scss'],
})
export class CreateEvaluateComponent implements OnInit {
  configHeader: any = {
    title: 'Tạo đơn xin nghỉ học',
    btnLeft: {
      show: true,
      icon: 'assets/icon/icon-back-page.svg',
      router: '/tabs/message/evaluate',
    },
    btnRight: {
      show: false,
      icon: 'assets/icon/icon-add.svg',
      router: 'create',
    },
  };

  model: any = {};
  constructor(
    private route: Router,
    private alertCtrl: AlertController,
    private service: EvalueteService
  ) {}

  ngOnInit() {}

  onSave = () => {
    this.model.Type = 1;
    this.model.UserProfileId = 2112;
    this.model.Title = this.model.Content;
    this.model.StartTime = this.model.StartTime.replace('T', ' ');
    this.model.EndTime = this.model.EndTime.replace('T', ' ');
    this.service.create(this.model).subscribe(async (res) => {
      const alert = await this.alertCtrl.create({
        header: 'Thông báo',
        subHeader: 'Thành công',
        message: 'Thêm lịch nghỉ thành công.',
        buttons: [
          {
            text: 'OK',
            handler: async (blah) => {
              this.route.navigateByUrl('/tabs/message/evaluate');
            },
          },
        ],
      });
      await alert.present();
    });
  };
}

@NgModule({
  declarations: [CreateEvaluateComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HearderEvalueteModule,
    IonicModule,
  ],
  exports: [CreateEvaluateComponent],
})
export class CreateEvaluateModule {}
