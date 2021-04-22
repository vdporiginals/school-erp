/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  NgZone,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { BehaviorSubject, from, Observable, of, Subject, timer } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { LocalStorageService } from 'src/app/storage/localstorage.service';
import { MessageService } from '../services/message.service';
import { SocketService } from '../services/socket.service';
import { MessageTextComponent } from './message-text/message-text.component';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.page.html',
  styleUrls: ['./chat-message.page.scss'],
})
export class ChatMessagePage implements OnInit {
  textAreaInput = '';
  currentSenderId = new BehaviorSubject<string>(null);
  listImageBase64 = new BehaviorSubject<any[]>([]);

  listHistory: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  fetchMessage$: Observable<any>;
  killSubcription: Subject<any> = new Subject<any>();
  listRendererId = [];
  private refreshMessage$: Observable<string> = timer(0, 5000).pipe(
    switchMap(() => this.fetchMessage$),
    catchError((err) => of(err)),
    takeUntil(this.killSubcription)
  );

  private mutationObserver: MutationObserver;

  curUser: any = this.storage.getToken();
  currenName: string;
  currentAvatar: string;
  searchTextString;
  numOfSearchText;
  isSended;
  unread: number;
  imageLinkUpload = '';
  unSendMessage$ = new BehaviorSubject<any[]>([]);

  @ViewChild('listMessageParent', { read: ViewContainerRef })
  listMessageParent: any;
  @ViewChild('wrapperMessage', { read: ViewContainerRef, static: true })
  wrapperMessage: any;
  @ViewChild(IonContent) messageContainer: any;
  componentRef: ComponentRef<MessageTextComponent>;
  constructor(
    private resolver: ComponentFactoryResolver,
    public _zone: NgZone,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router,
    // private loading: LoadingService,
    // private s3Service: S3Service,
    // private deeplink: DeeplinkService,
    // private notiStateService: NotificationStateService,
    // private renderer: Renderer2,
    private storage: LocalStorageService,
    private socketService: SocketService,
    private messageService: MessageService
  ) {
    //Pass current state of route
    let state = null;
    if (this.router.getCurrentNavigation()?.hasOwnProperty('extras')) {
      state = this.router.getCurrentNavigation().extras.state;
    }
    if (state) {
      // console.log(state);

      if (state.unread) {
        this.unread = state.unread;
      }
      this.currenName = state.senderName;
      this.currentAvatar = state.senderAvatar;
    }

    route.params.subscribe((res) => {
      // console.log(res);
      if (res) {
        this.currentSenderId.next(res.id);
      }
    });
  }

  ngOnInit() {
    this.listHistory.next([]);
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        if (params.unread) {
          this.unread = params.unread;
        }
        this.currenName = params.senderName;
        this.currentAvatar = params.senderAvatar;
      }
    });

    // this.loading.presentLoading();

    //Lấy về lịch sử tin nhắn
    this.currentSenderId.subscribe((res) => {
      if (res) {
        this.getHistory(res);
      }
    });
  }

  ionViewDidEnter() {
    this.socketService.connect();
    //Effect fetch tin nhắn mới nhất
    //Scroll to bottom
    setTimeout(() => {
      this.messageContainer.scrollToBottom(300);
    }, 500);

    //Mutation Observer xem sử thay đổi của DOM trong component. Auto scroll khi render tin nhắn mới
    this.mutationObserver = new MutationObserver((res: any) => {
      this.messageContainer.scrollToBottom(300);
    });

    this.socketService.messages$.subscribe((res: any) => {
      if (res) {
        const arr = this.listHistory
          .getValue()
          .map((a) => a.createdOn || a.CreatedOn);
        console.log(!arr.some((a) => a === res.createdOn));

        if (arr.some((a) => a === res.createdOn) === false) {
          // this.templateMessage(res);
          this.listHistory.next(this.listHistory.getValue().concat(res));
          setTimeout(() => {
            this.messageContainer.scrollToBottom(300);
          }, 100);
        }

        // this.newMessage$.next();
      }
    });

    this.mutationObserver.observe(
      this.listMessageParent.element.nativeElement,
      {
        childList: true,
      }
    );
  }

  templateMessage(res) {
    if (!res.message || res.Content === '') {
      return;
    }
    console.log(res);

    const factory: ComponentFactory<MessageTextComponent> = this.resolver.resolveComponentFactory(
      MessageTextComponent
    );
    this.componentRef = this.wrapperMessage.createComponent(factory);
    this.componentRef.instance.index = this.listRendererId.length - 1;
    this.componentRef.instance.item = res;
    this.componentRef.instance.searchTextString = this.searchTextString;
    this.textAreaInput = '';
    this.cd.detectChanges();
    setTimeout(() => {
      this.messageContainer.scrollToBottom(300);
    }, 100);
    return;
  }

  async getHistory(id) {
    // if (this.unread) {
    //   this.notiStateService.setMessageCount(
    //     this.notiStateService.messageCount.getValue() - +this.unread
    //   );
    // }
    let receive;
    if (this.curUser?.UserProfileId == '2323') {
      receive = '2053';
    } else {
      receive = '2323';
    }
    this.messageService.getListMessage(receive).subscribe((res: any) => {
      // res.forEach((val) => {
      //   this.listRendererId.push(val.MessageId);
      // });
      this.listHistory.next(res.body.Payload.reverse());
    });
    // this.messageService.getHistoryMes(id).subscribe((res) => {
    //   // this.loading.closeLoading();
    //   // console.log(this.listHistory.getValue());
    // });
    return true;
  }

  sendMessage(type?, link?) {
    // this.messageId += 1;
    // // this.templateMessage({
    // //   IsMine: true,
    // //   Content: this.textAreaInput,
    // // });

    let content = this.textAreaInput;
    if (link) {
      content = link;
    } else {
      content = this.textAreaInput;
    }
    const curDate = new Date().toISOString();
    let receive;
    if (this.curUser.UserProfileId == '2053') {
      receive = '2323';
    } else {
      receive = '2053';
    }

    this.listHistory.next(
      this.listHistory.getValue().concat({
        action: 'sendMessage',
        message: content,
        createdOn: curDate,
        // type,
        userProfileId: receive,
      })
    );
    // this.unSendMessage$.next(
    //   [...this.unSendMessage$.getValue()].concat({
    //     action: 'sendMessage',
    //     message: content,
    //     createdOn: curDate,
    //     type,
    //     userProfileId: receive,
    //   })
    // );

    this.socketService.sendMessage({
      action: 'sendMessage',
      message: content,
      createdOn: curDate,
      // type,
      userProfileId: receive,
    });

    setTimeout(() => {
      this.messageContainer.scrollToBottom(300);
    }, 100);
    this.textAreaInput = '';
    return;
    // this.deeplink.deeplink();
    if (
      ((this.textAreaInput == '' || this.textAreaInput.length === 0) &&
        type === 1) ||
      this.isSended === false
    ) {
      return;
    }
  }
}
