import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatMessagePage } from '../chat-message/chat-message.page';

import { ListMessagePage } from './list-message.page';

const routes: Routes = [
  {
    path: '',
    component: ListMessagePage,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMessagePageRoutingModule {}
