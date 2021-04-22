import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage implements OnInit {
  configHeader: any = {
    title: 'Danh sách xe',
    btnLeft: {
      show: true,
      icon: 'assets/icon/icon-back-page.svg',
      router: 'tabs/home',
    },
    btnRight: {
      show: true,
      icon: 'assets/icon/add-icon.svg',
      router: 'create',
    },
  };

  constructor(private http: HttpClient) {}
  listBus: any = [];
  ngOnInit() {
    this.http
      .get(`https://schoolbusapi.chuyendoisodn.com/api/Bus`)
      .subscribe((res: any) => {
        this.listBus = res.Payload;
      });
  }
}
