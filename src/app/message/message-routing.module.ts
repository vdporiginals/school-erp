import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatMessagePage } from './chat-message/chat-message.page';

import { MessagePage } from './message.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./list-message/list-message.module').then(
        (m) => m.ListMessagePageModule
      ),
  },
  {
    path: 'list-message',
    component: MessagePage,
    children: [],
  },
  {
    path: 'detail-message/:id',
    component: ChatMessagePage,
  },
  {
    path: 'evaluate',
    loadChildren: () =>
      import('./evaluate/evaluate.module').then((m) => m.EvaluatePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagePageRoutingModule {}
