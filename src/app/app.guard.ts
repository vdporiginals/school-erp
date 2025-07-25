import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LocalStorageService } from './storage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AppGuard  {
  constructor(
    public storageService: LocalStorageService,
    public router: Router
  ) {}
  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return from(this.storageService.checkIsAuth()).pipe(
      take(1),
      map((res: any) => {

        if (res === false || !res) {
          return true;
        }

        this.router.navigateByUrl('/tabs/home');
        return false;
      })
    );
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return from(this.storageService.checkIsAuth()).pipe(
      take(1),
      map((res: any) => {

        if (res) {
          return true;
        }

        this.router.navigateByUrl('/login');
        return false;
      })
    );
  }
}
