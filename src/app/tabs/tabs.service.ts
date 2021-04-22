import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  hideTabBarPages = ['detail-message'];

  routeParamPages: string[] = ['detail-message'];

  constructor(private router: Router, private platform: Platform) {
    this.platform.ready().then(() => {
      this.navEvents();
    });
  }

  public hideTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar?.style) {
      if (tabBar?.style.display !== 'none') {
        tabBar.style.display = 'none';
      }
    }
  }

  public showTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar?.style) {
      if (tabBar?.style.display !== 'flex') {
        tabBar.style.display = 'flex';
      }
    }
  }

  // A simple subscription that tells us what page we're currently navigating to.
  private navEvents() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.showHideTabs(e);
      });
  }

  private showHideTabs(e: any) {
    // Result:  e.url: "/tabs/groups/new-group?type=group"

    // Split the URL up into an array.
    const urlArray = e.url.split('/');

    // Result: urlArray: ["", "tabs", "groups", "new-group?type=group"]
    // Grab the parentUrl
    const pageUrlParent = urlArray[urlArray.length - 3];
    // Grab the last page url.
    const pageUrl = urlArray[urlArray.length - 2];
    // Result: new-group?type=group

    const page = pageUrl.split('?')[0];
    console.log(pageUrl);

    // Result: new-group
    // Check if it's a routeParamPage that we need to hide on
    const hideParamPage = this.routeParamPages.indexOf(pageUrlParent) > -1;
    // Check if we should hide or show tabs.
    const shouldHide = this.hideTabBarPages.indexOf(page) > -1 || hideParamPage;
    // Result: true
    console.log(shouldHide, this.hideTabBarPages.indexOf(page));

    // Not ideal to set the timeout, but I haven't figured out a better method to wait until the page is in transition...
    try {
      setTimeout(
        () => (shouldHide === true ? this.hideTabs() : this.showTabs()),
        300
      );
    } catch (err) {}
  }
}
