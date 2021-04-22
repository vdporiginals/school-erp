import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HearderEvalueteModule } from 'src/app/message/evaluate/hearder-evaluete/hearder-evaluete.component';

@Component({
  selector: 'app-detail-bus',
  templateUrl: './detail-bus.component.html',
  styleUrls: ['./detail-bus.component.scss'],
})
export class DetailBusComponent implements OnInit {
  configHeader: any = {
    title: 'Chi tiết xe',
    btnLeft: {
      show: true,
      icon: 'assets/icon/icon-back-page.svg',
      router: '',
    },
    btnRight: {
      show: false,
      icon: 'assets/icon/add-icon.svg',
      router: '/bus',
    },
  };
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  model: any = {};
  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.http
      .get(`https://schoolbusapi.chuyendoisodn.com/api/Bus/detail/${id}`)
      .subscribe((res: any) => {
        this.model = res.Payload;
      });
  }
}
@NgModule({
  declarations: [DetailBusComponent],
  imports: [CommonModule, IonicModule, HearderEvalueteModule],
})
export class DetailBusModule {}
