import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from '../storage/localstorage.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: false
})
export class TabsPage implements OnDestroy {
  currentUrl = new BehaviorSubject<string>(null);
  curUser: any = this.storage.getToken();
  constructor(
    private router: Router,
    private storage: LocalStorageService,
    public route: ActivatedRoute
  ) {
    this.storage.userToken.next(this.storage.getToken());
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.checkIsHiddenRoute();
      });
  }

  ngOnDestroy() {
    this.curUser = null;
  }
  checkIsHiddenRoute() {
    console.log(this.router.url);

    if (this.router.url.includes('detail-message')) {
      this.currentUrl.next('detail-message');
    } else {
      this.currentUrl.next(null);
    }
  }
}
