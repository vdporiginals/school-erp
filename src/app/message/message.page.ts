import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../storage/localstorage.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  curUser: any = this.storage.getToken();

  constructor(private storage: LocalStorageService) {}

  ngOnInit() {}
}
