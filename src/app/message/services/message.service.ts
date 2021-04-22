/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  API_URL = 'https://li1jm77bc8.execute-api.ap-southeast-1.amazonaws.com';
  constructor(protected http: HttpClient) {}
  getListMessage() {
    return this.http.get(this.API_URL + '/prod/user/message', {
      params: {
        userProfileId1: '',
        userProfileId2: '',
        pageNumber: '1',
        pageSize: '50',
      },
    });
  }
}
