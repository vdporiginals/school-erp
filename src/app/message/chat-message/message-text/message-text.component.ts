import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Pipe,
  PipeTransform,
  NgModule,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalStorageService } from 'src/app/storage/localstorage.service';

@Component({
  selector: 'app-message-text',
  template: `<ion-item>
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
  </ion-item> `,
  styleUrls: ['./message-text.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageTextComponent {
  @Input() index;
  @Input() item;
  @Input() searchTextString;
  curUser: any = this.storage.getToken();

  constructor(
    private platform: Platform,
    private storage: LocalStorageService
  ) {}
}
