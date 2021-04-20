import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagePage } from './message.page';

const routes: Routes = [
    {
        path: '',
        component: MessagePage
    },
    {
        path: 'evaluate',
        loadChildren: () => import('./evaluate/evaluate.module').then(m => m.EvaluatePageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagePageRoutingModule { }
