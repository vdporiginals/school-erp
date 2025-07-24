import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HearderEvalueteModule } from '../message/evaluate/hearder-evaluete/hearder-evaluete.component';
import { BusPageRoutingModule } from './bus-routing.module';
import { BusPage } from './bus.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BusPageRoutingModule,
        HearderEvalueteModule,
        RouterModule
    ],
    declarations: [BusPage]
})
export class BusPageModule { }
