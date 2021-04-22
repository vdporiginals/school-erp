/* eslint-disable eqeqeq */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/storage/localstorage.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.page.html',
  styleUrls: ['./list-message.page.scss'],
})
export class ListMessagePage implements OnInit, OnDestroy {
  lastMessage: any;
  curUser: Observable<any>;
  constructor(
    private messageService: MessageService,
    private storage: LocalStorageService
  ) {}

  ngOnInit() {
    this.curUser = this.storage.userToken.asObservable();
    let receive;
    console.log(this.storage.getToken().UserProfileId == '2323');

    if (this.storage.getToken().UserProfileId == '2323') {
      receive = '2053';
    } else {
      receive = '2323';
    }

    this.messageService.getListMessage(receive).subscribe((res: any) => {
      this.lastMessage = res.body?.Payload[0];
    });
  }

  ngOnDestroy() {}

  segmentChanged(ev) {}
}
