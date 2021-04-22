import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.page.html',
  styleUrls: ['./list-message.page.scss'],
})
export class ListMessagePage implements OnInit {
  lastMessage: any;
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getListMessage().subscribe((res: any) => {
      console.log(res);
      this.lastMessage = res.body.Payload[res.body.Payload.length - 1];
    });
  }

  segmentChanged(ev) {}
}
