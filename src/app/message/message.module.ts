import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagePageRoutingModule } from './message-routing.module';

import { MessagePage } from './message.page';
import { ChatMessagePage } from './chat-message/chat-message.page';
import { MessageTextComponent } from './chat-message/message-text/message-text.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MessagePageRoutingModule],
  declarations: [MessagePage, ChatMessagePage, MessageTextComponent],
})
export class MessagePageModule {}
