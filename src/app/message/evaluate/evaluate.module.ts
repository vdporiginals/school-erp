import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EvaluatePageRoutingModule } from './evaluate-routing.module';
import { HearderEvalueteModule } from './hearder-evaluete/hearder-evaluete.component';
import { EvaluateComponent } from './list/evaluate.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { CommonModule } from '@angular/common';

@NgModule({ declarations: [
        EvaluateComponent
    ], imports: [IonicModule,
        EvaluatePageRoutingModule,
        HearderEvalueteModule,
        CommonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class EvaluatePageModule { }
