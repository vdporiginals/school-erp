import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatMessagePage } from './chat-message/chat-message.page';

import { MessagePage } from './message.page';

const routes: Routes = [
  {
    path: '',
    component: MessagePage,
    children: [],
  },
  {
    path: 'list-message',
    loadChildren: () =>
      import('./list-message/list-message.module').then(
        (m) => m.ListMessagePageModule
      ),
  },
  {
    path: 'detail-message/:id',
    component: ChatMessagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagePageRoutingModule {}
