import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/storage/localstorage.service';

@Component({
    selector: 'app-hearder-evaluete',
    templateUrl: './hearder-evaluete.component.html',
    styleUrls: ['./hearder-evaluete.component.scss'],
    standalone: false
})
export class HearderEvalueteComponent implements OnDestroy,OnInit{
  curUser: Observable<any> ;
  @Input() config: any = {};
  constructor(private storage: LocalStorageService){

  }
  ngOnInit(){
    this.curUser = this.storage.userToken.asObservable();
  }
  ngOnDestroy() {
  }
}
@NgModule({
  declarations: [HearderEvalueteComponent],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [HearderEvalueteComponent],
})
export class HearderEvalueteModule {}
