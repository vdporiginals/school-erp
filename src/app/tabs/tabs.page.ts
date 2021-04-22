import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  currentUrl = new BehaviorSubject<string>(null);

  constructor(private router: Router, public route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.checkIsHiddenRoute();
      });
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
