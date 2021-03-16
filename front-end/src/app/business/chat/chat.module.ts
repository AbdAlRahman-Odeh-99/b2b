import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ConversationComponent } from './conversation/conversation.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import { AvatarModule } from 'ngx-avatar';
import { ContactsComponent } from './contacts/contacts.component';
import { ChatService } from './service/chat.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BasedUrlsConstants } from '@app/core/constants/routes';

const config: SocketIoConfig = { url: `${BasedUrlsConstants.BASED_URL_LOCALHOST}` };

@NgModule({
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    ChatRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AutosizeModule,
    AvatarModule
  ],
  declarations: [ChatComponent, ConversationComponent, ContactsComponent],
  providers: [
    ChatService
  ]
})
export class ChatModule { }
