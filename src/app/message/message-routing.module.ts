import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagePage } from './message.page';

const routes: Routes = [
  {
    path: '',
    component: MessagePage
  },
  {
    path: 'list-message',
    loadChildren: () => import('./list-message/list-message.module').then( m => m.ListMessagePageModule)
  },
  {
    path: 'chat-message',
    loadChildren: () => import('./chat-message/chat-message.module').then( m => m.ChatMessagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagePageRoutingModule {}
