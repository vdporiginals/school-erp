import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Pipe,
  PipeTransform,
  NgModule,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/storage/localstorage.service';

@Component({
    selector: 'app-message-text',
    template: `<ion-item>
      @if (curUser | async; as curUser) {
        <ion-grid>
          <ion-row>
            <ion-col
              size="12"
          [class]="
            item.ReceiverUserProfileId == curUser.UserProfileId ||
            item.action == 'receiveMessage'
              ? 'message-customer'
              : 'message-root'
          "
              >
              <ion-text
            [class]="
              item.ReceiverUserProfileId == curUser.UserProfileId ||
              item.action == 'receiveMessage'
                ? 'ms-customer'
                : 'ms-root'
            "
                >
                <p>
                  {{ item.message || item.Content }}
                </p>
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-grid>
      }
    </ion-item>`,
    styleUrls: ['./message-text.component.scss'],
    // encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MessageTextComponent implements OnDestroy, OnInit {
  @Input() index;
  @Input() item;
  @Input() searchTextString;
  curUser: Observable<any>;

  constructor(
    private platform: Platform,
    private storage: LocalStorageService
  ) {}
  ngOnInit() {
    this.curUser = this.storage.userToken.asObservable();
  }
  ngOnDestroy() {
    ;
  }
}
