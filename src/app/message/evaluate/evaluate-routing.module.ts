import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEvaluateComponent } from './create-evaluate/create-evaluate.component';
import { DetailEvaluateComponent } from './detail-evaluate/detail-evaluate.component';
import { EvaluateComponent } from './list/evaluate.component';

const routes: Routes = [
    {
        path: '',
        component: EvaluateComponent,
    },
    {
        path: 'create',
        component: CreateEvaluateComponent,
    },
    {
        path: ':id',
        component: DetailEvaluateComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EvaluatePageRoutingModule { }
