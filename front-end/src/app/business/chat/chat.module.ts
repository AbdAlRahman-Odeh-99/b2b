import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ConversationComponent } from './conversation/conversation.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ChatComponent, ContactsComponent, ConversationComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    IonicModule
  ]
})
export class ChatModule { }
