import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../storage/localstorage.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.page.html',
    styleUrls: ['./message.page.scss'],
    standalone: false
})
export class MessagePage implements OnInit {
  curUser: Observable<any>;
  constructor(private storage: LocalStorageService) {}

  ngOnInit() {
    this.curUser = this.storage.userToken.asObservable();
  }

}
