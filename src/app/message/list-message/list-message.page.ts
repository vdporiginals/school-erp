import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.page.html',
  styleUrls: ['./list-message.page.scss'],
})
export class ListMessagePage implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getListMessage().subscribe((res) => {
      console.log(res);
    });
  }

  segmentChanged(ev) {}
}
