/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private userInfo: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private userToken: BehaviorSubject<any> = new BehaviorSubject<any>({});
  userInfo$ = this.userInfo.asObservable();
  userToken$ = this.userToken.asObservable();
  constructor(
    private loadingController: LoadingController,
    // private stateService: StateService,
    private storage: Storage
  ) {}

  async checkIsAuth(): Promise<boolean> {
    const token = await this.storage.get('access_token');
    if (token === null || !token) {
      return false;
    } else {
      return JSON.parse(token);
    }
  }

  // Store the value
  async store(storageKey: string, value: any) {
    const encryptedValue = JSON.stringify(value);
    await this.storage.set(storageKey, encryptedValue);
  }

  // Get the value
  async get(storageKey: string) {
    const ret = await this.storage.get(storageKey);

    // console.log(ret);
    if (ret) {
      return JSON.parse(ret);
    } else {
      return false;
    }
  }

  async remove(storageKey: string) {
    await this.storage.remove(storageKey);
  }

  async clear() {
    await this.storage.clear();
  }

  getUserToken() {
    return this.userToken.getValue();
  }

  getUserInfo() {
    return this.userInfo.getValue();
  }

  async logOut() {
    this.userInfo.next({});
    this.userToken.next({});
    // await this.storage.re();
    await this.remove('access_token');
    await this.remove('device_token');
    return true;
  }
}
