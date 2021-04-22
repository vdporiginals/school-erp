import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusPage } from './bus.page';
import { DetailBusComponent } from './detail-bus/detail-bus.component';


const routes: Routes = [
    {
        path: '',
        component: BusPage
    },
    {
        path: ':id',
        component: DetailBusComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BusPageRoutingModule { }
