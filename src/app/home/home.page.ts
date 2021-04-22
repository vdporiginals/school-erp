import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../storage/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  curUser: Observable<any>;
  constructor(private storage: LocalStorageService) {}

  ngOnInit() {
    this.curUser = this.storage.userToken.asObservable();
  }

  ngOnDestroy() {}
}
