/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/storage/localstorage.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.page.html',
  styleUrls: ['./list-message.page.scss'],
})
export class ListMessagePage implements OnInit {
  lastMessage: any;
  curUser: any = this.storage.getToken();
  constructor(
    private messageService: MessageService,
    private storage: LocalStorageService
  ) {}

  ngOnInit() {
    let receive;
    if (this.curUser?.UserProfileId == '2323') {
      receive = '2053';
    } else {
      receive = '2323';
    }

    this.messageService.getListMessage(receive).subscribe((res: any) => {
      this.lastMessage = res.body.Payload[0];
    });
  }

  segmentChanged(ev) {}
}
